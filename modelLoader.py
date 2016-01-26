import os
import sys
import models
import webapp2

from google.appengine.ext import ndb

class MigrateData(webapp2.RequestHandler):
    def get(self):
        listOfEntities=[]

        #Load kgFile, load two at once
        '''self.loadKgFile("kg_02d.txt",listOfEntities)
        self.loadKgFile("kg_e2l.txt",listOfEntities)
        self.loadKgFile("kg_m2r.txt",listOfEntities)
        self.loadKgFile("kg_s2z.txt",listOfEntities)'''

        #Load tagTrend
        #self.loadTagTrend("tagTrend_refine.txt",listOfEntities)

        #Load CodeSnippet
        #self.loadCodeSnippet("codeSnippet.txt",listOfEntities)

        #Load Hyperlink
        #self.loadHyperlink("hyperlink.txt",listOfEntities)

        #Load TaskKG
        #self.loadTaskKgYear("taskKG_year.txt",listOfEntities)

        #Load loadKnowledgeGraph_multi
        #self.loadKnowledgeGraph_multi("knowledgeGraph_multi.txt",listOfEntities)

        #Load Expert
        '''self.loadExpert("expert1.txt",listOfEntities)
        self.loadExpert("expert2.txt",listOfEntities)
        self.loadExpert("expert3.txt",listOfEntities)
        self.loadExpert("expert4.txt",listOfEntities)
        self.loadExpert("expert5.txt",listOfEntities)
        self.loadExpert("expert6.txt",listOfEntities)'''


        #Load loadKnowledgeGraph
        self.loadKnowledgeGraph("knowledgeGraph.txt",listOfEntities)

        ndb.put_multi(listOfEntities)

        #For deletion
        '''ndb.delete_multi(
            models.Expert.query().fetch(keys_only=True)
        )'''
    
    def loadKgFile(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t")
            data = models.KgFile(
                tag = temp[0],
                knowledgeGraph = temp[1]
            )
            listOfData.append(data)
        return

    def loadTagTrend(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t")
            data = models.TagTrend_refine(
                tag = temp[0],
                trendData = temp[1]
            )
            listOfData.append(data)
        return

    def loadCodeSnippet(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t",1)
            if len(temp) == 1:
                data = models.CodeSnippet(
                tag = temp[0]
            )
            else:
                data = models.CodeSnippet(
                tag = temp[0],
                code = temp[1]
                )
            listOfData.append(data)
        return

    def loadHyperlink(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t",1)
            if len(temp) == 1:
                data = models.Hyperlink(
                    tag = temp[0]
                )
            else:
                data = models.Hyperlink(
                    tag = temp[0],
                    link = temp[1]
                )
            listOfData.append(data)
        return

    def loadTaskKgYear(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t")
            data = models.TaskKgYear(
                tag = temp[0],
                knowledgeGraph = temp[1]
            )
            listOfData.append(data)
        return

    def loadKnowledgeGraph_multi(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t")
            data = models.KnowledgeGraph_multi(
                tag = temp[0],
                data = temp[1]
            )
            listOfData.append(data)
        return

    def loadExpert(self, fileName, listOfData):
        with open(fileName, "r") as inputFile:
            for line in inputFile:
                temp = line.strip().split("\t",1)
                data = models.Expert(
                    expertId = temp[0],
                    eName_Kg = temp[1]
                )
                listOfData.append(data)
        return

    def loadKnowledgeGraph(self, fileName, listOfData):
        f = open(fileName)
        lines = f.readlines()
        f.close()
        for line in lines:
            temp = line.strip().split("\t")
            data = models.KnowledgeGraph(
                tag = temp[0],
                knowledgeGraph = temp[1]
            )
            listOfData.append(data)
        return

application = webapp2.WSGIApplication([
    ("/migratedata", MigrateData),
], debug=True)