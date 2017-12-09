import csv, json

school_map = {}

with open('zone2.csv', 'r') as csvfile:
	mapreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	zone = []
	for row in mapreader:
		zone.append([x for x in row])
	school_map["zone2"] = zone

with open('zone3.csv', 'r') as csvfile:
	mapreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	zone = []
	for row in mapreader:
		zone.append([x for x in row])
	school_map["zone3"] = zone

json_map = {}

for zone in school_map:
	json_map[zone] = []
	for row in school_map[zone]:
		new_row = []
		for cell in row:
			if cell == "0":
				item = {"type": "empty"}
			elif cell == "2":
				item = {"type": "table"}
			else:
				item = {"type": "computer", "host": cell}
			new_row.append(item)
		json_map[zone].append(new_row)

print(json.dumps(json_map))