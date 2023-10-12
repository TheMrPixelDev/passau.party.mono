import requests
import bs4
from bs4 import NavigableString
from dateutil import parser
from functools import reduce
import json

raw_html = requests.get(
    "https://www.zauberberg-passau.com/veranstaltungen").text

webpage = bs4.BeautifulSoup(raw_html, "html.parser")

eventcards = webpage.findAll(attrs={"data-hook": "events-card"})

events = []

month_mappings = {
    "Jan": "Jan",
    "Feb.": "Feb",
    "Mär.": "Mar",
    "Apr.": "Apr",
    "Mai.": "May",
    "Jun.": "Jun",
    "Jul.": "Jul",
    "Aug.": "Aug",
    "Sept": "Sept",
    "Okt": "Oct",
    "Nov": "Nov",
    "Dez": "Dec"
}

current_events: list = json.loads(requests.get(
    "http://localhost:8080/events?safe=both").text)

print(json.dumps(current_events, indent=4))

for eventcard in eventcards:
    title = eventcard.find(attrs={"data-hook": "title"}).a.text
    location = eventcard.find(attrs={"data-hook": "title"}).text
    date: str = eventcard.find(attrs={"data-hook": "date"}).text
    description = eventcard.find(attrs={"data-hook": "description"}).text

    details_link = eventcard.find(
        attrs={"data-hook": "ev-rsvp-button"})["href"]

    details_page_html = requests.get(details_link).text
    details_page = bs4.BeautifulSoup(details_page_html, "html.parser")
    details_element = details_page.find(
        attrs={"data-hook": "about-section-text"})
    details = []

    if details_element is not None and type(details_element) is not NavigableString:
        details = details_element.findAll(name="p")  # type: ignore

    details = list(filter(lambda a: a != "", map(lambda a: a.text, details)))

    parsed_date = None
    for month in month_mappings.items():
        date = date.replace(month[0], month[1])
    for part in date.split(" – "):
        try:
            parsed_date = int(parser.parse(part.strip()).timestamp())
        except:
            pass

    events.append({
        "title": title,
        "location": location,
        "summary": description,
        "datetime": parsed_date,
        "description": "||".join(details),
        "rating": 0,
    })


for event in events:

    is_already_in_database = False

    for current_event in current_events:

        if current_event["title"] == event["title"] and current_event["datetime"] == event["datetime"]:
            print("Event is already in database")
            is_already_in_database = True
            break

    if not is_already_in_database:
        print(json.dumps(event, indent=4))
        print(requests.post("http://localhost:8080/events", json=event).text)
