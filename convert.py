import re
import os

files = [
    ("student_dashboard.html", "StudentDashboard"),
    ("performance_indicator_database.html", "PerformanceDatabase"),
    ("exam_simulation_engine.html", "ExamSimulation"),
    ("deca_coach_ai_assistant.html", "DecaCoachAi")
]

def convert_html_to_jsx(html):
    # Extract main content
    match = re.search(r'(<main.*?>.*?</main>)', html, re.DOTALL)
    if match:
        main = match.group(1)
    else:
        main = html

    # Replace class with className
    main = main.replace('class="', 'className="')
    
    # Replace comments
    main = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', main, flags=re.DOTALL)

    # Style replacements
    main = re.sub(r'style="height:\s*(.*?)"', r'style={{ height: "\1" }}', main)
    main = re.sub(r'style="width:\s*(.*?)"', r'style={{ width: "\1" }}', main)
    main = re.sub(r'style="font-variation-settings:\s*\'FILL\'\s*1;?"', r'style={{ fontVariationSettings: "\'FILL\' 1" }}', main)
    main = re.sub(r'style="font-variation-settings:\s*\'FILL\'\s*0;?"', r'style={{ fontVariationSettings: "\'FILL\' 0" }}', main)

    # Label for
    main = main.replace('for="', 'htmlFor="')
    
    # Unclosed tags (img already self-closed mostly, input and br need it if not)
    main = re.sub(r'<input([^>]*?[^\/])>', r'<input\1 />', main)
    main = re.sub(r'<br([^>]*?[^\/])>', r'<br\1 />', main)
    main = re.sub(r'<hr([^>]*?[^\/])>', r'<hr\1 />', main)

    # Specific SVG attrs if any
    main = main.replace('stroke-width', 'strokeWidth')
    main = main.replace('stroke-linecap', 'strokeLinecap')
    main = main.replace('stroke-linejoin', 'strokeLinejoin')
    main = main.replace('colspan=', 'colSpan=')
    main = main.replace('readonly', 'readOnly')

    return main

for filename, comp_name in files:
    path = os.path.join('stitch_assets', 'code', filename)
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    jsx = convert_html_to_jsx(html)
    
    out_code = f"""export default function {comp_name}() {{
  return (
    <>
{jsx}
    </>
  );
}}
"""
    out_path = os.path.join('src', 'pages', f"{comp_name}.jsx")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(out_code)
    print(f"Generated {out_path}")
