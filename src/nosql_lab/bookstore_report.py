#!/usr/bin/env python3
import os
from pymongo import MongoClient
import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)
MONGODB_ATLAS_URL = os.getenv("MONGODB_ATLAS_URL")
MONGODB_ATLAS_USER = os.getenv("MONGODB_ATLAS_USER")
MONGODB_ATLAS_PWD = os.getenv("MONGODB_ATLAS_PWD")
def main():
	'''connecting to MongoDB and printing reports'''
	mongo = None
	try:
		mongo = MongoClient(
			MONGODB_ATLAS_URL,
			username = MONGODB_ATLAS_USER,
			password = MONGODB_ATLAS_PWD
		)
		logging.info("Connecting to MongoDB")
		db = mongo['bookstore']
		authors = db['authors']
		books = db['books']
		author_ids = ['author_002','author_003','author_005']
		count = authors.count_documents({'_id':{'$in':author_ids}})
		print(f'authors: {count}')
		for author in authors.find({'_id':{'$in':author_ids}}):
			print(author['name'])
			for book in books.find({'author_ids':author['_id']}):
				print(f"Title: {book['title']}")
				print(f"Year published: {book['published_year']}")
	except:
		logging.error("oopsie, there's an error!")
	finally:
		if mongo is not None:
			mongo.close()
			logging.info("Closing MongoDB")
if __name__ == "__main__":
	main()
