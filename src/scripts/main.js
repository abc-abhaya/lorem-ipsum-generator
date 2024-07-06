const tagOptions = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const selectTags = document.getElementById('tags');
const paraSlider = document.getElementById('paragraphs');
const wordSlider = document.getElementById('words');
const includes = document.getElementById('include');
const btn = document.getElementById('generate');
const outputContainer = document.getElementById('output');

function createOptionsInUI() {
	tagOptions.forEach((tag) => {
		const opt = document.createElement('option');
		opt.value = tag;
		opt.innerText = `<${tag}>`;
		selectTags.appendChild(opt);
	});

	const wordValue = wordSlider.nextElementSibling;
	const paraValue = paraSlider.nextElementSibling;
	paraSlider.addEventListener('change', () => {
		paraValue.innerText = paraSlider.value;
	});
	wordSlider.addEventListener('change', () => {
		wordValue.innerText = wordSlider.value;
	});
	btn.addEventListener('click', () => {
		generateLoremIpsum();
	});
}

function generateLoremIpsum() {
	const numOfPara = parseInt(paraSlider.value);
	const numOfWordsPerParagraph = parseInt(wordSlider.value);
	const includeHtml = includes.value.toLowerCase() === 'yes' ? true : false;
	const tags = selectTags.value;
	const loremIpsumText = generateText(
		numOfPara,
		includeHtml,
		tags,
		numOfWordsPerParagraph
	);
	displayLoremIpsum(loremIpsumText);
}

function generateText(numOfPara, includeHtml, tags, numOfWordsPerParagraph) {
	const loremIpsumArray = new Array(numOfPara).fill('');
	for (let i = 0; i < loremIpsumArray.length; i++) {
		const words = generateWords(numOfWordsPerParagraph);
		if (includeHtml) {
			loremIpsumArray[i] = `<${tags}>${words}</${tags}>`;
		} else {
			loremIpsumArray[i] = words;
		}
	}

	return loremIpsumArray.join('\n');
}

function generateWords(numOfWords) {
	const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur  
        adipiscing elit, sed do eiusmod tempor  
        incididunt ut labore et dolore magna  
        aliqua. Diam in arcu cursus euismod  
        quis viverra nibh. Nunc aliquet bibendum 
        enim facilisis gravida neque convallis  
        a cras. Sagittis purus sit amet volutpat 
        Consequat mauris. Duis ultricies lacus  
        sed turpis tincidunt id. Consequat interdum 
        varius sit amet mattis vulputate. Enim sed 
        faucibus turpis in eu. Ridiculus mus mauris 
        vitae ultricies leo integer malesuada nunc vel. 
        Nulla pharetra diam sit amet nisl suscipit. 
        Lobortis elementum nibh tellus molestie nunc 
        non blandit massa enim. Dis parturient montes 
        nascetur ridiculus mus. Justo nec ultrices dui 
        sapien eget. Enim tortor at auctor urna nunc. 
        Dictumst quisque sagittis purus sit amet volutpat 
        consequat mauris nunc.`;
	const words = loremIpsumText.split(' ');

	if (numOfWords <= words.length) {
		return words.slice(0, numOfWords).join(' ');
	} else {
		return words.join(' ');
	}
}

function displayLoremIpsum(text) {
	outputContainer.innerText = text;
}

createOptionsInUI();
