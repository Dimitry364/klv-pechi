function Test(n) {
  for (let i = 1; i <= n; i++) {
    let res = '1';
    // for (let a = 1; a <= i; a++) {
    //   res += 1;
    // }
    console.log(res.repeat(i));
  }
}

Test(5);
