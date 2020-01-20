var findAnagrams = function(s, p) {
  // generate character count for p
  // create a window of size p in s, generate character count
  // if anagram, add to output
  // move window one character over, update character count
  // go back to check
  if (!p || !s || p.length === 0 || s.length === 0) return [];

  const pCharCounts = genCharCounts(p);
  const window = initWindow(s, p);
  if (!window) return [];
  const windowCharCounts = genCharCounts(s, ...window);
  const res = [];

  while (window[1] < s.length) {
    if (isAnagram(windowCharCounts, pCharCounts)) {
      res.push(window[0]);
    }

    windowCharCounts[alphabetToArrayIndex(s[window[0]])]--;
    window[0]++;

    window[1]++;
    if (window[1] >= s.length) break;
    windowCharCounts[alphabetToArrayIndex(s[window[1]])]++;
  }

  return res;
};

function genCharCounts(str, start = 0, end = str.length - 1) {
  const charCounts = new Array(26).fill(0);
  for (let i = start; i <= end; i++) {
    charCounts[alphabetToArrayIndex(str[i])]++;
  }
  return charCounts;
}

function initWindow(s, p) {
  if (s.length < p.length) {
    return null; // error case
  } else {
    return [0, p.length - 1];
  }
}

function isAnagram(charCountsA, charCountsB) {
  // assumes charCountsA and B have the same length (they should)
  for (let i = 0; i < charCountsA.length; i++) {
    if (charCountsA[i] !== charCountsB[i]) {
      return false;
    }
  }
  return true;
}

function alphabetToArrayIndex(letter) {
  return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}
