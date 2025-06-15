let data, currentLevel, currentWord, score, usedHint;
const startEl = document.getElementById('start-word');
const targetEl = document.getElementById('target-word');
const scoreEl = document.getElementById('score');
const inputEl = document.getElementById('word-input');
const ladderEl = document.getElementById('ladder');
const hintBtn = document.getElementById('hint-btn');
const contrastBtn = document.getElementById('contrast-toggle');
const levelSelector = document.getElementById('level-selector');
const gameEl = document.getElementById('game');

fetch('wordlist.json')
  .then(r => r.json())
  .then(json => { data = json; showLevels(); });

function showLevels(){
  levelSelector.innerHTML = '';
  data.levels.forEach((lvl,i)=>{
    const btn = document.createElement('button');
    btn.textContent = `${lvl.start} → ${lvl.target}`;
    btn.onclick = () => startLevel(i);
    levelSelector.appendChild(btn);
  });
  levelSelector.classList.remove('hidden');
}

function startLevel(index){
  currentLevel = data.levels[index];
  currentWord = currentLevel.start;
  score = 10;
  usedHint=false;
  ladderEl.innerHTML='';
  startEl.textContent = 'Start: '+currentLevel.start;
  targetEl.textContent = 'Target: '+currentLevel.target;
  scoreEl.textContent = 'Score: '+score;
  inputEl.value='';
  levelSelector.classList.add('hidden');
  gameEl.classList.remove('hidden');
  addWord(currentWord);
}

function addWord(word){
  const li = document.createElement('li');
  li.textContent = word;
  li.onclick = () => alert(data.dictionary[word] || 'No definition');
  ladderEl.appendChild(li);
}

inputEl.addEventListener('keyup', e => {
  if(e.key==='Enter') submitWord();
});

function submitWord(){
  const next = inputEl.value.trim().toLowerCase();
  inputEl.value='';
  if(!validateWord(next)) return;
  currentWord = next;
  addWord(next);
  if(next===currentLevel.target){
    finishGame();
    return;
  }
  if(ladderEl.children.length-1>currentLevel.steps) score--;
  scoreEl.textContent = 'Score: '+score;
  usedHint=false;
}

function validateWord(word){
  if(word.length!==currentWord.length) return false;
  if(!data.dictionary[word]) return false;
  let diff=0;
  for(let i=0;i<word.length;i++){
    if(word[i]!==currentWord[i]) diff++;
  }
  return diff===1;
}

hintBtn.onclick=()=>{
  if(usedHint) return;
  usedHint=true;
  score-=5;
  scoreEl.textContent = 'Score: '+score;
  const pos = diffPosition(currentWord, currentLevel.target);
  if(pos!==-1){
    blinkHint(pos);
  }
};

function diffPosition(a,b){
  for(let i=0;i<a.length;i++) if(a[i]!==b[i]) return i;
  return -1;
}

function blinkHint(pos){
  const letters = currentWord.split('');
  const ladderItems = ladderEl.querySelectorAll('li');
  const currentItem = ladderItems[ladderItems.length-1];
  const span = document.createElement('span');
  span.textContent = letters[pos];
  currentItem.innerHTML = currentWord.slice(0,pos)+
    '<span class="hint">'+currentWord[pos]+'</span>'+
    currentWord.slice(pos+1);
  setTimeout(()=>{
    currentItem.innerHTML=letters.join('');
  },1000);
}

function finishGame(){
  alert('Finished! Score: '+score);
  gameEl.classList.add('hidden');
  showLevels();
}

contrastBtn.onclick=()=>{
  document.body.classList.toggle('high-contrast');
};
