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

const getAmountOfOverusedWords = (betterWords) => {
  let list = [];
  overusedWords.value.split(' ').forEach(word => {
    let hit = betterWords.filter(el => el === word);
    list.push( word + ': ' + hit.length + '<br>');
  });
  return list.join('');
}

const getAmountOfSentences = () => {
  const punctuationMarks = ['.','!','?'];
  let occurance =
  punctuationMarks.map(mark => {
    let split = story.value.split(mark);
    return split.length;
  });  
  return occurance.reduce(( accumulator, currentValue ) => accumulator + currentValue);
}

const btn = document.getElementById('submit');
btn.addEventListener('click', (event)=>{
  event.preventDefault();

  const storyWords = story.value.split(' ');

  function filterWords(value) {
    return !unnecessaryWords.value.includes(value);
  }
  const betterWords = storyWords.filter(filterWords);

  improvedStory.innerHTML = betterWords.join(' ');
  
  amountOfSentences.innerHTML = getAmountOfSentences();
  amountOfWords.innerHTML = storyWords.length;
  amountOfOverusedWords.innerHTML = getAmountOfOverusedWords(betterWords);
})



 /*
console.log(
  'amount of sentences: ' + amountOfSentences() + '\n' +
  'amount of words: ' + storyWords.length + '\n' +
  'amount of overused words:\n' + amountOfOverusedWords() + '\n' + 
  'improved story:\n' 
  + betterWords.join(' ')
  );

*/