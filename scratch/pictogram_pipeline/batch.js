const fs = require('fs');
const path = require('path');
const { isOpaqueInk, connectedComponents, Jimp } = require('./lib.js');
const { composeOnFrame, CANVAS_W, CANVAS_H } = require('./compose.js');

const FRAME = path.join(__dirname, 'CANONICAL_EMPTY_FRAME.png');

async function sanityCheck(srcPath) {
    const img = await Jimp.read(srcPath);
    const { width, height } = img.bitmap;
    const comps = connectedComponents(img, isOpaqueInk).filter(c => c.count > 15);
    const area = c => (c.maxX - c.minX + 1) * (c.maxY - c.minY + 1);
    comps.sort((a, b) => area(b) - area(a));
    const border = comps[0];
    const borderWFrac = (border.maxX - border.minX + 1) / width;
    const borderHFrac = (border.maxY - border.minY + 1) / height;
    const subjectComps = comps.slice(1);
    const subjectPixelCount = subjectComps.reduce((s, c) => s + c.count, 0);
    return {
        borderOk: borderWFrac > 0.8 && borderHFrac > 0.8,
        subjectOk: subjectComps.length > 0 && subjectPixelCount > 200,
        borderWFrac, borderHFrac, subjectPixelCount, numSubjectComps: subjectComps.length,
    };
}

async function processFolder(srcDir, stagedDir, skipFiles) {
    fs.mkdirSync(stagedDir, { recursive: true });
    const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png') && !skipFiles.includes(f));
    const results = [];
    for (const f of files) {
        const srcPath = path.join(srcDir, f);
        const outPath = path.join(stagedDir, f);
        try {
            const check = await sanityCheck(srcPath);
            const { newW, newH, scale } = await composeOnFrame(srcPath, FRAME, outPath);
            const stat = fs.statSync(outPath);
            results.push({
                file: f, ok: check.borderOk && check.subjectOk,
                borderWFrac: check.borderWFrac.toFixed(2), borderHFrac: check.borderHFrac.toFixed(2),
                subjectPixelCount: check.subjectPixelCount, numSubjectComps: check.numSubjectComps,
                scale: scale.toFixed(2), sizeKB: Math.round(stat.size / 1024),
            });
        } catch (e) {
            results.push({ file: f, ok: false, error: e.message });
        }
    }
    return results;
}

(async () => {
    const eduResults = await processFolder(
        'assets/illustrations/education-pictograms',
        'scratch/pictogram_pipeline/staged_education',
        ['pictogram-fire-prev.png', 'pictogram-utensilios-rev.png']
    );
    const travelResults = await processFolder(
        'assets/illustrations/travel-pictograms',
        'scratch/pictogram_pipeline/staged_travel',
        ['pictogram-transporte-aviao.png']
    );
    console.log('=== EDUCATION ===');
    eduResults.forEach(r => console.log(JSON.stringify(r)));
    console.log('=== TRAVEL ===');
    travelResults.forEach(r => console.log(JSON.stringify(r)));

    const all = [...eduResults, ...travelResults];
    const failed = all.filter(r => !r.ok);
    console.log('');
    console.log('TOTAL:', all.length, 'OK:', all.length - failed.length, 'FALHAS:', failed.length);
    if (failed.length) console.log('Arquivos com problema:', failed.map(f => f.file).join(', '));
})();
