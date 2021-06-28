from django.db.models import fields
from rest_framework.serializers import ModelSerializer, Serializer
from teachers.models import ClassRoom, Notes, Document, Semester, Teacher
from teachers.models import RankingDocument, Subject
from teachers.models import Assignment, GradedAssignment, Choice, Question
from rest_framework import serializers

from main.models import UserProfile
import random
# // Classroom info
# Notes Seriazlizer,
# Document Serializer
# Assignment Serializer
# Leave Request Serializer


# Ranking Document Seriazlizer
#


class TeacherUserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["firstname", "lastname", "email", "birthdate", "profile_pic"]


class TeacherSerializer(ModelSerializer):

    user = TeacherUserProfileSerializer(many=False)

    class Meta:
        model = Teacher
        fields = ["user"]


class SubjectSerializer(ModelSerializer):

    class Meta:
        model = Subject
        fields = "__all__"


class SemesterSerializer(ModelSerializer):
    subjects = SubjectSerializer(many=True)

    class Meta:
        model = Semester
        fields = "__all__"


class ClassRoomSerializer(ModelSerializer):

    semesters = SemesterSerializer(many=True)

    class Meta:
        model = ClassRoom
        fields = "__all__"


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = "__all__"


class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


# Assignment Thing

class ChoiceSerializer(ModelSerializer):

    class Meta:
        model = Choice
        fields = ["title"]


class QuestionSerializer(ModelSerializer):
    choices = serializers.SerializerMethodField()

    def get_choices(self, question):
        all_choices = list(question.choices.all())+[question.answer]
        random.shuffle(all_choices)

        return ChoiceSerializer(all_choices, many=True).data

    class Meta:
        model = Question
        fields = ["question", "choices", "id"]


class AssignmentSerializer(ModelSerializer):

    no_of_questions = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()

    def get_no_of_questions(self, assignment):
        return len(assignment.assignmentQuestions.all())

    def get_questions(self, assignment):
        assingmentQuestions = assignment.assignmentQuestions.all()
        assingmentQuestionsData = QuestionSerializer(
            assingmentQuestions, many=True).data

        return assingmentQuestionsData

    def get_teacher_name(self, assignment):
        return assignment.teacher.user.firstname

    class Meta:
        fields = ['title', "subject", "created_at",
                  "no_of_questions", "questions", 'teacher_name', 'deadline']
        model = Assignment
