const cn = (...args) => args.filter(Boolean).join(' ');

const extractUPIFromLink = (upiLink) => {
    try {
        const url = new URL(upiLink);
        const searchParams = new URLSearchParams(url.search);
        const upiId = searchParams.get('pa');

        if (upiId) {
            return decodeURIComponent(upiId);
        }
    } catch (error) {
        return false;
    }

    return null;
};

const validateUPI = (upiId) => {
    const basicUPIRegex = /^[\w.-]+@[\w.-]+$/;
    const upiLinkRegex = /^upi:\/\/pay\?(?=.*\bpa=([\w.-]+@[\w.-]+)\b)(?=.*\bpn=([\w%]+|\*{6}\d+)\b).*$/;

    if (basicUPIRegex.test(upiId)) {
        return upiId;
    } else if (upiLinkRegex.test(upiId)) {
        return extractUPIFromLink(upiId);
    } else {
        return false;
    }
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


const trimWalletAddress = (address) => {
    return `${address.substring(0, 8)}...${address.substring(36)}`;
}
export { cn, validateUPI, extractUPIFromLink, trimWalletAddress, validateEmail };