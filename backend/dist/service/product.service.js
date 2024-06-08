"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cloudinary_config_1 = __importDefault(require("../cloudinary.config"));
const cart_service_1 = __importDefault(require("./cart.service"));
const applyDiscount_1 = __importDefault(require("../decorator/applyDiscount"));
const prisma = new client_1.PrismaClient();
const cart = new cart_service_1.default();
let ProductService = (() => {
    var _a;
    let _staticExtraInitializers = [];
    let _static_getProductsDiscount_decorators;
    return _a = class ProductService {
            static async getAllProducts(req) {
                const id = Number(req.query.id);
                if (id !== undefined && id) {
                    return await prisma.products.findFirst({
                        where: {
                            id: id,
                        },
                    });
                }
                else {
                    return await prisma.products.findMany();
                }
            }
            static async saveProduct(req) {
                const { title, description, content, price, quantity } = req.body;
                const files = req.files;
                const uploadedImages = {};
                for (const field in files) {
                    const fieldFiles = files[field];
                    if (fieldFiles) {
                        for (const file of fieldFiles) {
                            const result = await cloudinary_config_1.default.uploader.upload(file.path);
                            uploadedImages[field] = uploadedImages[field] || [];
                            uploadedImages[field].push(result.secure_url);
                        }
                    }
                }
                const gallery = [];
                uploadedImages?.gallery?.map((item) => {
                    gallery.push(item);
                });
                const query = {
                    data: {
                        title: title,
                        description: description,
                        price: parseInt(price),
                        image: uploadedImages.image[0],
                        thumbnail: uploadedImages.thumbnail[0],
                        gallery: gallery,
                        stocks: {
                            create: {
                                quantity: parseInt(quantity),
                            },
                        },
                    },
                };
                const data = await prisma.products.create(query);
                return { data: data };
            }
            // get product amount by id
            static async getProductAmountById(id) {
                const data = await prisma.products.findFirst({
                    where: {
                        id: id,
                    },
                });
                return data?.price;
            }
            // This method is used to add a product to the cart
            static async userAddItemToCart(req) {
                const { product_id, user_id, quantity } = req.body;
                const data = await cart.addItem(user_id, product_id, quantity);
                return data;
            }
            // This method is used to update the quantity of a product in the cart
            static async userUpdateItemInCart(req) {
                const { product_id, user_id, quantity } = req.body;
                const data = await cart.updateItem(user_id, product_id, quantity);
                return data;
            }
            // This method is used to delete a product from the cart
            static async userDeleteItemFromCart(req) {
                const { product_id, user_id } = req.body;
                const data = await cart.deleteItem(user_id, product_id);
                return data;
            }
            // get products with discount
            static async getProductsDiscount(productId, customer_segment, discount) {
                const product = await prisma.products.findUnique({
                    where: { id: productId },
                });
                if (!product) {
                    throw new Error("Product not found");
                }
                if (discount && discount.length > 0) {
                    product.price = calculateDiscountedPrice(product.price, discount);
                }
                return product;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_getProductsDiscount_decorators = [applyDiscount_1.default];
            __esDecorate(_a, null, _static_getProductsDiscount_decorators, { kind: "method", name: "getProductsDiscount", static: true, private: false, access: { has: obj => "getProductsDiscount" in obj, get: obj => obj.getProductsDiscount }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a;
})();
function calculateDiscountedPrice(price, discounts) {
    let finalPrice = price;
    discounts.forEach((item) => {
        finalPrice -= (price * item.discount) / 100;
    });
    return finalPrice;
}
exports.default = ProductService;
