class HandleError extends Error {
    static EchoError(message) {
        throw new Error(message)
    }
}

export default HandleError