export default (text = 'Hello world11') => {
    console.log(text);
    const element = document.createElement('div');
    element.innerHTML = text;
    return element;
};

