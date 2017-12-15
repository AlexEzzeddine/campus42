import json

school_map = {"zone2": [], "zone3": []}

with open('website/map.json', 'r') as jsonfile:
	school_map = json.loads(jsonfile.read())