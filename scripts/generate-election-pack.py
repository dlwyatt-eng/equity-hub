"""Generate the low-ink provincial election inquiry pack for the Equity Hub."""

from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUT = Path(__file__).resolve().parents[1] / "public/downloads/bc-provincial-party-inquiry-black-white.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
W, H = letter
M = 43
INK = (0.08, 0.12, 0.13)
MID = (0.31, 0.35, 0.36)
LIGHT = (0.78, 0.80, 0.80)
pdfmetrics.registerFont(TTFont("PackSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("PackSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
c = canvas.Canvas(str(OUT), pagesize=letter)
c.setTitle("B.C. Provincial Party Inquiry - teacher and student pack")
c.setAuthor("Equity & Social Justice Hub")


def txt(x, y, value, size=10, bold=False, color=INK):
    c.setFillColorRGB(*color)
    c.setFont("PackSans-Bold" if bold else "PackSans", size)
    c.drawString(x, y, value)


def lines(x, y, value, width=W - 2 * M, size=10, leading=14, bold=False, color=INK):
    for row in simpleSplit(value, "PackSans-Bold" if bold else "PackSans", size, width):
        txt(x, y, row, size, bold, color)
        y -= leading
    return y


def header(n, tag, title, subtitle):
    c.setStrokeColorRGB(*INK)
    c.setLineWidth(1.3)
    c.line(M, H - 37, W - M, H - 37)
    txt(M, H - 28, "EQUITY HUB  /  B.C. PROVINCIAL ELECTION 2026", 8, True)
    txt(M, H - 65, tag.upper(), 9, True, MID)
    txt(M, H - 94, title, 20, True)
    lines(M, H - 115, subtitle, size=9.5, leading=13)
    c.setStrokeColorRGB(*LIGHT)
    c.line(M, 35, W - M, 35)
    txt(M, 22, "Party positions can change. Check the date and original source before teaching.", 7.5, color=MID)
    txt(W - M - 30, 22, f"{n} / 8", 8, True, MID)


def section(y, title, body=None):
    txt(M, y, title.upper(), 10, True)
    c.setStrokeColorRGB(*LIGHT)
    c.line(M, y - 7, W - M, y - 7)
    y -= 25
    if body:
        y = lines(M, y, body, size=9.5, leading=13) - 8
    return y


def bullet(y, value, indent=0):
    txt(M + indent, y, "-", 10, True)
    return lines(M + 15 + indent, y, value, width=W - 2 * M - 18 - indent, size=9.5, leading=13) - 7


def writing(y, label, count=2, width=W - 2 * M):
    txt(M, y, label, 9.5, True)
    y -= 16
    c.setStrokeColorRGB(*LIGHT)
    for _ in range(count):
        c.line(M, y, M + width, y)
        y -= 21
    return y - 8


def box(x, top, width, height, title, prompt, rules=3):
    c.setStrokeColorRGB(*MID)
    c.rect(x, top - height, width, height)
    txt(x + 10, top - 18, title.upper(), 9, True)
    yy = lines(x + 10, top - 36, prompt, width - 20, 8.5, 11)
    c.setStrokeColorRGB(*LIGHT)
    for k in range(rules):
        yy -= 13
        c.line(x + 10, yy, x + width - 10, yy)


def finish():
    c.showPage()


# 1. Teacher start
header(1, "Teacher quick start", "Party inquiry, ready to teach", "Grades 6-7 | two 40-minute blocks | research, critique, create, discuss")
y = section(645, "Learning goal", "Students compare current proposals, test a criticism with evidence, and explain a reasoned view. A personal party preference is optional.")
y = section(y, "Before students arrive")
for item in [
    "Select one shared provincial issue. Prepare two or three current, age-appropriate source excerpts from each party you include, plus one credible account of a criticism and any party reply. Date every excerpt.",
    "Offer the same source time and the same comparison headings for every party. A short, teacher-curated source folder works with shared devices or printed copies.",
    "Print pages 3-6 for each student or pair. Use page 7 as discussion cards. Keep pages 1-2 and 8 for planning and assessment.",
]:
    y = bullet(y, item)
y = section(y - 2, "Source starting points")
for item in [
    "Elections BC: elections.bc.ca/2026-provincial-election/",
    "Registered parties: elections.bc.ca/candidates-parties/political-parties/",
    "Party starting points: bcndp.ca  |  conservativebc.ca  |  bcgreens.ca  (check the complete registered-party list too)",
    "Student Vote: studentvote.ca/  |  Elections BC education: elections.bc.ca/voting/outreach-and-education/educational-resources/",
]:
    y = bullet(y, item)
y = section(y - 1, "Participation choices")
for item in [
    "Students may research a party they favour, compare several, or keep their own choice private. Nobody reports a family vote.",
    "Use anonymous questions, paired conversation, drawing, or writing so students can contribute without a public speech.",
    "Check school guidance before posting party materials or running public campaign-style activities. Keep the teacher role even-handed.",
]:
    y = bullet(y, item)
finish()

# 2. Teacher plan
header(2, "Teacher run sheet", "Two lessons, one clear product", "Project the four Equity Hub screens; these timings can stretch or compress.")
y = section(645, "Block A - investigate (40 minutes)")
for item in [
    "0-5: Ask: Which decisions are provincial? Choose one shared issue; clarify that claims, predictions, and values are different.",
    "5-17: Model a source record on page 3: exact proposal, party, date, and link. Students examine equal excerpts from two or more parties.",
    "17-30: Fill page 4 using the same issue and headings for each party. Say 'not found in sources checked' rather than inventing a position.",
    "30-40: Begin page 5. Read one criticism aloud; identify the critic, evidence, party response, uncertainty, and affected perspectives.",
]: y = bullet(y, item)
y = section(y - 1, "Block B - make and discuss (40 minutes)")
for item in [
    "0-7: Revisit the criticism. Ask: What is established, what is predicted, and what is someone's opinion?",
    "7-24: Students use page 6 to draft an infographic on paper or a slide. Require a proposal, comparison, criticism and response, an open question, and sources.",
    "24-35: Pair or gallery conversation using page 7. Invite a respectful challenge and an honest 'I do not know yet.'",
    "35-40: Revise one claim and complete the exit reflection on page 8. A secret mock vote is optional and separate from assessment.",
]: y = bullet(y, item)
y = section(y - 1, "Teacher model: a criticism without a verdict")
y = lines(M, y, "Frame: 'The party proposes ___. A critic argues ___ because ___. The party responds ___. The evidence we can check is ___. The unresolved question is ___.'", size=9.5, leading=14) - 10
y = section(y, "Look for")
for item in [
    "Accurate description of at least two parties on the same issue, with a date and source for each claim.",
    "A criticism attributed to its source, a party response if available, and a clear distinction between fact, prediction, and opinion.",
    "A reasoned personal view if the student chooses to share one; a change of mind also counts as strong thinking.",
]: y = bullet(y, item)
finish()

# 3. Source log
header(3, "Student page 1", "Follow the source", "Name: ___________________________    Date checked: __________________")
y = writing(640, "Our shared issue", 1)
y = writing(y, "Party or candidate I am investigating", 1)
y = section(y, "Source 1 - party's own words")
for label in ["Title / organization / web address", "Publication or update date", "One exact proposal in my own words", "Evidence that this is what the party actually proposes"]:
    y = writing(y, label, 1 if "date" in label.lower() else 2)
y = section(y - 3, "Source 2 - another party on the same issue")
for label in ["Title / organization / web address", "Publication or update date", "Its proposal in my own words"]:
    y = writing(y, label, 1 if "date" in label.lower() else 2)
txt(M, 65, "CHECK: Is this a current proposal, an older promise, a campaign ad, or someone's opinion?", 9, True)
finish()

# 4. Party comparison
header(4, "Student page 2", "Compare the same question", "Name: ___________________________    Issue: ___________________________")
txt(M, 639, "Use the same issue for each column. Write 'not found in sources checked' if needed.", 9)
cols = [M, M + 110, M + 249, M + 388, W - M]
top, bottom = 612, 123
c.setStrokeColorRGB(*MID)
for x in cols: c.line(x, top, x, bottom)
for yy in [top, 565, 490, 390, 300, 210, bottom]: c.line(M, yy, W - M, yy)
heads = ["COMPARE", "PARTY 1", "PARTY 2", "PARTY 3 / OPTIONAL"]
for j, head in enumerate(heads): txt(cols[j] + 7, 587, head, 8, True)
rows = [
    ("Party name", 540), ("What it proposes", 465), ("Who might benefit?", 365),
    ("Concern or trade-off", 275), ("Source and date", 185)
]
for label, yy in rows: lines(M + 7, yy, label, 96, 8.5, 11, True)
txt(M, 88, "One difference that matters to me:", 9, True)
c.setStrokeColorRGB(*LIGHT)
c.line(M, 68, W - M, 68)
finish()

# 5. Criticism evidence
header(5, "Student page 3", "Test a criticism", "Name: ___________________________    Party being examined: __________________")
y = writing(637, "The proposal - what did the party actually say? Source and date:", 2)
y = writing(y, "The criticism - who raised it, and what exactly do they claim? Source and date:", 2)
y = writing(y, "Evidence - what can we verify? Which part is prediction or opinion?", 2)
y = writing(y, "Party response - what does the party say? If none found, where did you look?", 2)
y = writing(y, "Who may be affected? Whose perspective is missing?", 2)
y = writing(y, "One fair question I would ask this party:", 2)
txt(M, 62, "Repeat these questions for another party. Strong scrutiny uses the same standard.", 9, True)
finish()

# 6. Product template
header(6, "Student page 4", "Plan an evidence infographic", "Use the same headings as classmates. Draw here, then make your final version.")
box(M, 641, 256, 135, "1 / Proposal", "What does this party say it would do? Add a source and date.", 3)
box(M + 270, 641, 256, 135, "2 / Comparison", "How does another party approach the same issue?", 3)
box(M, 493, 256, 155, "3 / Criticism + response", "Who raises the concern? What does the party reply?", 4)
box(M + 270, 493, 256, 155, "4 / What is uncertain?", "What evidence is missing? Who may be affected?", 4)
box(M, 325, W - 2 * M, 110, "5 / An open question", "Ask something a voter could investigate before deciding.", 2)
box(M, 202, W - 2 * M, 91, "6 / Sources", "List the original sources and the date you checked them.", 1)
txt(M, 91, "OPTIONAL PERSONAL VIEW: I would support ______ because ______. Evidence: ______", 8.7, True)
txt(M, 72, "You may keep your preference private. Do not ask classmates how their families vote.", 8.5)
finish()

# 7. Conversation cards
header(7, "Discussion cards", "Ask a question that helps", "Cut out or project. Listen to the answer; ask for a source before judging the person.")
cards = [
    ("CLARIFY", "What does the party mean by that proposal? Where can we read its own words?"),
    ("COMPARE", "What does another party propose for the same issue?"),
    ("CHECK", "What evidence supports the criticism? Is any part a prediction?"),
    ("RESPOND", "Has the party answered this concern? What remains unanswered?"),
    ("EQUITY", "Who might benefit or face a barrier? Whose view is missing?"),
    ("RECONSIDER", "What new evidence could change your view?"),
]
for i, (title, prompt) in enumerate(cards):
    row, col = divmod(i, 2)
    box(M + col * 270, 643 - row * 167, 256, 151, title, prompt, 2)
txt(M, 113, "Conversation routine: explain accurately  /  invite a question  /  answer from evidence", 9, True)
txt(M, 94, "Useful answer: 'I do not know yet. I will check.'", 9)
txt(M, 74, "Afterward, revise one claim on your infographic.", 9)
finish()

# 8. Reflection and assessment
header(8, "Exit ticket + teacher check", "What changed in your thinking?", "Name: ___________________________    Date: ___________________________")
y = writing(636, "One claim I changed or made more precise after checking sources:", 3)
y = writing(y, "One criticism or response I still need to investigate:", 2)
y = writing(y, "What evidence could change your current view? (You do not need to name a party.)", 2)
y = section(y - 5, "Teacher check - circle a level for each")
for label in ["Uses dated, traceable sources for party proposals", "Compares parties on the same issue", "Attributes criticism and includes a response or honest gap", "Distinguishes fact, prediction, and opinion", "Asks and answers questions respectfully"]:
    txt(M, y, label, 9)
    txt(W - M - 105, y, "1   2   3   4", 9, True)
    y -= 27
txt(M, 85, "Feedback / next step:", 9, True)
c.setStrokeColorRGB(*LIGHT)
c.line(M, 64, W - M, 64)
finish()
c.save()
print(OUT)
