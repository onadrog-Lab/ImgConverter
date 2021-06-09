/**
 * Convert image to 'next-gen' format mime types
 * @param {Node} e Submit button
 * @param {string} type  webp / jpx / jp2. Default: webp
 * @param {number} quality controle quality for image. Default: 80
 * @param {File} file 
 */
const converter = (e, type = "webp", quality = 0.80, file) => {
    e.preventDefault()
    const canvas = document.getElementById('imgSrc')
    const ctx = canvas.getContext("2d")

    ctx.drawImage(file, 0, 0)

    const img = canvas.toDataURL(`image/${type}`, quality / 100)
}

export default converter

