module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("dog-part2.js");
    eleventyConfig.addPassthroughCopy("theme.js");
};