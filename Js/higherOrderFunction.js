function sing(callback) {
  console.log('la la la la');
  if (callback) callback();
}

function meow() {
  console.log('meow meow');
}

sing(() => console.log('meow meow'));
