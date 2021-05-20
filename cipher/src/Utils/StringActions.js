// padding character used to compensate uneven texts
export const PADDING_CHARACTER = '\u0002' 
export const CHARSET = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^`abcdefghijklmnopqrstuvwxyz{|}€¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷ùúûüýÿăąĊčđĕĘğħĩĭıĵķĿŀŁłňŋŏœŖřŝşŦŧũūůŲŵſƀƁƂƄƆƇƔƕƗƙƛƜƟƢƥƦƧƩƪƭƮưƱƲƵƸƺƾǀǁǂƿǬǮǵǶǹǻǿ")'

// Split strings in two 
export const split = (string) => {
  const half = string.length / 2

  return [string.substr(0, half), string.substr(half)]
}

// Add two strings charCodes - used to add value with key
export const add = (string1, string2) => {
  if (string1.length != string2.length) {
    // throw new Error('to be added, strings must be of the same length')
    console.error('Strings must be the same lenght')
    // TODO handle error here
  }

  return Array.from(string1).reduce((addedString, c, idx) => addedString + String.fromCharCode(c.charCodeAt(0) + string2.charCodeAt(idx)), '')
}