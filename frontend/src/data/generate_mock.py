import json
import os

input_file = "e:/Desktop/College Management/frontend/src/data/mockSchedules.js"
output_file = "e:/Desktop/College Management/frontend/src/data/mockSchedules2.js"

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_content = "export const schedules = {\n"
programs = ["BCA", "BBA", "MBA", "BCOM"]

for program in programs:
    for i in range(1, 7):
        new_content += f"    '{program}-{i}': [\n"
        
        # map semester (1-6) to year (1-3)
        year = (i + 1) // 2 
        source_key = f"'{program}-{year}': ["
        
        start_idx = -1
        for j, line in enumerate(lines):
            if source_key in line:
                start_idx = j
                break
                
        if start_idx != -1:
            end_idx = -1
            for j in range(start_idx + 1, len(lines)):
                if "]," in lines[j] or "] ," in lines[j]:
                    end_idx = j
                    break
                    
            if end_idx != -1:
                # Add the slots from the year
                new_content += "".join(lines[start_idx+1:end_idx])
                
        new_content += "    ],\n"

new_content += "};\n"

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Generated new mockSchedules.js")
