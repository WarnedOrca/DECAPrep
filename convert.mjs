import fs from 'fs';
import path from 'path';

const files = [
    ["student_dashboard.html", "StudentDashboard"],
    ["performance_indicator_database.html", "PerformanceDatabase"],
    ["exam_simulation_engine.html", "ExamSimulation"],
    ["deca_coach_ai_assistant.html", "DecaCoachAi"]
];

function convertHtmlToJsx(html) {
    let main = html;
    const mainMatch = html.match(/(<main[\s\S]*?<\/main>)/);
    if (mainMatch) {
        main = mainMatch[1];
    }

    // Class to className
    main = main.replace(/class="/g, 'className="');
    
    // Comments
    main = main.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

    // Simple styles
    main = main.replace(/style="height:\s*(.*?)"/g, 'style={{ height: "$1" }}');
    main = main.replace(/style="width:\s*(.*?)"/g, 'style={{ width: "$1" }}');
    main = main.replace(/style="font-variation-settings:\s*'FILL'\s*1;?"/g, "style={{ fontVariationSettings: \"'FILL' 1\" }}");
    main = main.replace(/style="font-variation-settings:\s*'FILL'\s*0;?"/g, "style={{ fontVariationSettings: \"'FILL' 0\" }}");

    // Label for
    main = main.replace(/for="/g, 'htmlFor="');
    
    // Self-closing
    main = main.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
    main = main.replace(/<br([^>]*?[^\/])>/g, '<br$1 />');
    main = main.replace(/<hr([^>]*?[^\/])>/g, '<hr$1 />');

    // DOM props
    main = main.replace(/stroke-width/g, 'strokeWidth');
    main = main.replace(/stroke-linecap/g, 'strokeLinecap');
    main = main.replace(/stroke-linejoin/g, 'strokeLinejoin');
    main = main.replace(/colspan=/g, 'colSpan=');
    main = main.replace(/readonly/g, 'readOnly');

    return main;
}

for (const [filename, comp_name] of files) {
    const inputPath = path.join('stitch_assets', 'code', filename);
    const html = fs.readFileSync(inputPath, 'utf8');
    const jsx = convertHtmlToJsx(html);
    
    const outCode = `export default function ${comp_name}() {
  return (
    <>
${jsx}
    </>
  );
}
`;
    const outPath = path.join('src', 'pages', `${comp_name}.jsx`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, outCode, 'utf8');
    console.log(`Generated ${outPath}`);
}
