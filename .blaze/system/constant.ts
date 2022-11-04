export const isTextNode = function (oldNode, newNode) {
	if (!oldNode && !newNode) return false;
	return ((oldNode && oldNode.nodeType === Node.TEXT_NODE) || (newNode && newNode.nodeType === Node.TEXT_NODE));
};
