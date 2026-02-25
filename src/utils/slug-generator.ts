export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // স্পেশাল ক্যারেক্টার রিমুভ করবে
    .replace(/[\s_-]+/g, "-") // স্পেস এবং আন্ডারস্কোরকে ড্যাশ দিয়ে রিপ্লেস করবে
    .replace(/^-+|-+$/g, ""); // শুরুতে বা শেষে ড্যাশ থাকলে মুছে ফেলবে
};
