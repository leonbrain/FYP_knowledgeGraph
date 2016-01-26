from google.appengine.ext import ndb

class TagTrend_refine(ndb.Model):
	tag = ndb.StringProperty()
	trendData = ndb.BlobProperty(compressed=True)

class KgFile(ndb.Model):
	tag = ndb.StringProperty()
	knowledgeGraph = ndb.BlobProperty(compressed=True)

class CodeSnippet(ndb.Model):
	tag = ndb.StringProperty()
	code = ndb.BlobProperty(compressed=True)

class Hyperlink(ndb.Model):
	tag = ndb.StringProperty()
	link = ndb.BlobProperty(compressed=True)

class TaskKgYear(ndb.Model):
	tag = ndb.StringProperty()
	knowledgeGraph = ndb.BlobProperty(compressed=True)

class KnowledgeGraph_multi(ndb.Model):
	tag = ndb.StringProperty()
	data = ndb.BlobProperty(compressed=True)

class Expert(ndb.Model):
	expertId = ndb.StringProperty()
	eName_Kg = ndb.BlobProperty(compressed=True)

class KnowledgeGraph(ndb.Model):
	tag = ndb.StringProperty()
	knowledgeGraph = ndb.BlobProperty(compressed=True)

class behaviourRecords(ndb.Model):
	ip_addr = ndb.StringProperty()
	access_time = ndb.DateTimeProperty(auto_now_add=True)
	current_tag = ndb.StringProperty()
	target_tag = ndb.StringProperty()
	action = ndb.StringProperty(indexed=False)
