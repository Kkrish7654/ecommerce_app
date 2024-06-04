export function slugify(title: string) {
  return title.split(" ").join("-").toLowerCase();
}
