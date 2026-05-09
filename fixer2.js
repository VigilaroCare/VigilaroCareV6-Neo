const fs = require('fs');

const files = [
  'screens/AcessoriosSegurancaScreen.js',
  'screens/EletrodomesticosScreen.js',
  'screens/SituacoesTemporariasScreen.js',
  'screens/VisitFlow/VisitTypeScreen.js',
  'screens/VisitFlow/VisitRiskFormScreen.js',
  'screens/Pets/PetWellnessScreen.js',
  'screens/RenovationFlow/RenovationTypeScreen.js',
  'screens/Profiles/FamilyCompositionScreen.js'
];

files.forEach(f => {
   let content = fs.readFileSync(f, 'utf8');
   const lines = content.split('\n');
   
   if (lines[0].startsWith('import { Typography, Spacing, Colors, Shadows } from')) {
       // Remove the bad first line
       lines.shift();
       content = lines.join('\n');
       
       // Now intelligently add missing tokens into existing import Theme, or add a clean one
       const existingImportMatch = content.match(/import\s+{([^}]+)}\s+from\s+['\"].*?Theme['\"]/);
       if (existingImportMatch) {
           let inner = existingImportMatch[1];
           ['Typography', 'Spacing', 'Colors', 'Shadows', 'BorderRadius', 'Components'].forEach(t => {
               if (!inner.includes(t)) inner += ', ' + t;
           });
           content = content.replace(existingImportMatch[0], 'import { ' + inner.split(',').map(s=>s.trim()).filter(Boolean).join(', ') + ' } from ' + existingImportMatch[0].split('from ')[1]);
       } else {
           // No existing import, we can safely prepend
           const depth = f.split('/').length - 1;
           let prefix = '';
           for(let i=0; i<depth; i++) prefix += '../';
           content = `import { Typography, Spacing, Colors, Shadows, BorderRadius, Components } from '${prefix}utils/Theme';\n` + content;
       }
       
       fs.writeFileSync(f, content, 'utf8');
       console.log('Fixed ' + f);
   } else {
       console.log('Skipped ' + f);
   }
});
