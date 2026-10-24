# Example prompts

Paste any of these into an agent that has the GetMyData skill or MCP server. Your agent will check the details with you, ask for your email, and show you the free preview (up to 10 rows) before anything else. A full dataset is only prepared if you ask for a quote and then decide to pay for it yourself on getmydata.io.

## Products and prices

```
Collect product name, price, currency and stock status for every item in this public catalogue: <URL>. Show me the free preview first.
```

```
I'm comparing loose-leaf tea prices. Get name, weight, price and availability from these two public shops: <URL 1>, <URL 2>. Up to 300 rows.
```

## Business directories

```
Get me 200 cafés in Lisbon from a public directory with name, website and neighbourhood, as a spreadsheet. Show me the free preview first.
```

```
Build a shortlist of packaging suppliers in Vietnam from a public business directory: company name, website, city and product category. Businesses only, no personal contacts.
```

## Events

```
List upcoming tech events in Berlin from these public pages with title, date, venue and organizer: <URL>.
```

## Books and catalogs

```
Get title, price, star rating and availability for books in the travel category of https://books.toscrape.com. Show me the free preview first.
```

## Open data

```
From this public open-data portal, collect the yearly figures for <dataset> by region as a CSV: <URL>.
```

## Following up

```
Check on my GetMyData request.
```

```
Here's the code from my email: <code>.
```

```
Add the product rating as a field and show me a new preview.
```

```
The preview looks right. Get me a quote for the full 500 rows.
```

```
My order is paid. Download the files as CSV and fields.json into ./data.
```

## Things it will not do

- Log in to a site with your password, or collect data behind a login.
- Pay for you. You always review and pay on the GetMyData website yourself.
- Run on a recurring schedule.
