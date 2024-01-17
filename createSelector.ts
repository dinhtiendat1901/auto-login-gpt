function filterAndFormatWords(input: string): string {
    // Split the string by spaces to get individual words
    const words = input.split(' ');

    // Use regular expression to filter words containing only numbers, alphabets, and '-'
    const filteredWords = words.filter(word => /^[a-zA-Z0-9-]+$/.test(word));

    // Add '.' before each word and join them without spaces
    const formattedWords = filteredWords.map(word => '.' + word).join('');

    return formattedWords;
}

const inputString = 'group flex cursor-pointer items-center gap-1 rounded-xl py-2 px-3 text-lg font-medium hover:bg-gray-50 radix-state-open:bg-gray-50 dark:hover:bg-black/10 dark:radix-state-open:bg-black/20';
const result = filterAndFormatWords(inputString);

// Wrap the result string with document.querySelectorAll()
const wrappedResult = `document.querySelectorAll('${result}')`;
console.log(wrappedResult);