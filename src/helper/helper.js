export const reversText = async(text) => {
    let reversText = ""
    for (let i = 0; i < text.length; i ++) {
        reversText += text[text.length - (i + 1)]
    }
    return reversText
}

