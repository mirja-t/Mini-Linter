const form = document.getElementById('miniLinter');

//let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';
const story = document.getElementById('story');

//let overusedWords = ['really', 'very', 'basically'];
const overusedWords = document.getElementById('overusedWords');

//let unnecessaryWords = ['extremely', 'literally', 'actually' ];
const unnecessaryWords = document.getElementById('unnecessaryWords');

const improvedStory = document.getElementById('improvedStory');

const amountOfSentences = document.getElementById('amountOfSentences');
const amountOfWords = document.getElementById('amountOfWords');
const amountOfOverusedWords = document.getElementById('amountOfOverusedWords');
const amountOfUnnecessaryWords = document.getElementById('amountOfUnnecessaryWords');
const amountOfRemovedWords = document.getElementById('amountOfRemovedWords');

const btnCopy = document.getElementById('copyToClipboard');
const copyToClipboard = () => {

  /* Select the text field */
  improvedStory.select();
  improvedStory.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand('copy');

  /* Alert the copied text */
  alert('Copied to clipboard');
}
btnCopy.addEventListener('click', copyToClipboard);

const getListOfWords = (words, list) => {
  if(!list.value.length) return null;
  let wordList = [];
  list.value.split(' ').forEach(word => {
    let hit = words.filter(el => el === word);
    wordList.push( word + ': ' + hit.length + '<br>');
  });
  return wordList.join('');
}

const getAmountOfWords = (str) => str.value.split(' ').length;

const getAmountOfSentences = (str) => {
  const punctuationMarks = ['.','!','?'];
  let occurance =
  punctuationMarks.map(mark => {
    let split = str.value.split(mark);
    return split.length;
  });  
  return occurance.reduce(( accumulator, currentValue ) => accumulator + currentValue);
}

const btn = document.getElementById('submit');
btn.addEventListener('click', (event)=>{
  event.preventDefault();

  function filterWords(word) {
    return !unnecessaryWords.value.includes(word);
  }

  function reduceWords(words) {
    
    const overusedWordsList = {};
    let betterWords = [];

    words.forEach(word => {
      if(overusedWords.value.split(' ').includes(word)) {
        overusedWordsList[word] = overusedWordsList[word] >= 0 ? overusedWordsList[word]+1 : 0;
        if(overusedWordsList[word] % 2 === 0) betterWords.push(word)
      }
      else {
        betterWords.push(word)
      }
    });
    return betterWords;
  }

  const filteredWords = story.value.split(' ').filter(filterWords);
  const reducedWords = reduceWords(filteredWords);
  const listOfUnnecessaryWords = getListOfWords(story.value.split(' '), unnecessaryWords);
  const listOfOverusedWords = getListOfWords(story.value.split(' '), overusedWords);
  console.log(listOfUnnecessaryWords, listOfOverusedWords)
  improvedStory.innerHTML = reducedWords.join(' ');
  amountOfSentences.innerHTML = getAmountOfSentences(improvedStory);
  amountOfRemovedWords.innerHTML = getAmountOfWords(story) - getAmountOfWords(improvedStory);
  amountOfWords.innerHTML = reducedWords.length;
  amountOfUnnecessaryWords.innerHTML = listOfUnnecessaryWords ? listOfUnnecessaryWords : '–';
  amountOfOverusedWords.innerHTML = listOfOverusedWords ? listOfOverusedWords : '–';
});

