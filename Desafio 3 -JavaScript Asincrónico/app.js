const showWords = async (text, callback, time = 500) => {
  let arr = text.split(" ");
  let i = 0;
  let largo = arr.length;
  for (i; i < arr.length; i++) {
    await timeOut(time);
    console.log(arr[i]);
  }
  callback(`Proceso completo! Cantidad de palabras totales: ${largo}`);
};
const timeOut = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
};

async function showWordsInOrder() {

  try {
    await showWords(text1, (word) => {
      console.log(word);
    });
    await showWords(
      text2,
      (word) => {
        console.log(word);
      },
      500
    );
    await showWords(
      text3,
      (word) => {
        console.log(word);
      },
      500
    );
  } catch (error) {
    console.log(error);
  }
}
let text1 = "Este es el primer mensaje enviado";
let text2 = "Este es el segundo mensaje, luego del primero";
let text3 = "Este es el tercer mensaje, luego del segundo mensaje";
showWordsInOrder(text1);