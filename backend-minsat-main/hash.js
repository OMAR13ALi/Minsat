import  bcrypt from 'bcryptjs';
bcrypt.hash('siwar123', 10, (err, hash) => {
  if (err) throw err;
  console.log(hash);
});