export default function setFavicon(url, type = 'x-icon') {
	const link = document.createElement('link');
	link.type = 'image/' + type;
	link.rel = 'shortcut icon';
	link.href = url;
	document.head.appendChild(link);
}
