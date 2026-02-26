import re

with open("app/promo/page.tsx", "r") as f:
    content = f.read()

faq_start = content.find("      {/* ═══════════════════════════════════════\n          FAQ")
faq_end = content.find("      {/* ═══════════════════════════════════════\n          MINI FOOTER")

if faq_start != -1 and faq_end != -1:
    faq_block = content[faq_start:faq_end]
    content = content[:faq_start] + content[faq_end:]
    
    contact_start = content.find("      {/* ═══════════════════════════════════════\n          6. CONTACT / BOOKING FORM")
    if contact_start != -1:
        content = content[:contact_start] + faq_block + content[contact_start:]
        
        with open("app/promo/page.tsx", "w") as f:
            f.write(content)
        print("Successfully moved FAQ block.")
    else:
        print("Contact form block not found.")
else:
    print("FAQ block or footer not found.")
