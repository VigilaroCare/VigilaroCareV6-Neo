const fs = require('fs');

const orig3 = fs.readFileSync('orig3.txt', 'utf8');
const current3 = fs.readFileSync('REVISAO_CONTEUDOS_PARTE3.txt', 'utf8');

const origLines = orig3.split('\n');
const currLines = current3.split('\n');

let diff = [];
for(let i=0; i<Math.max(origLines.length, currLines.length); i++) {
  if (origLines[i] !== currLines[i]) {
    diff.push(`Line ${i+1}:\n- ${origLines[i]}\n+ ${currLines[i]}`);
  }
}
console.log('Total differences in PARTE3:', diff.length);
if (diff.length > 0 && diff.length < 50) {
  console.log(diff.join('\n'));
} else if (diff.length > 0) {
  console.log(diff.slice(0, 10).join('\n'));
  console.log('...and more');
}
