from django.utils import tree
from rest_framework import response
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, NOT
from django.shortcuts import get_object_or_404


# Models
from teachers.models import Assignment, Document, DocumentResult, Exam, Notes, Question, Student, Subject, SubjectEntry, TimeTable
from teachers.models import GradedAssignment

# Serializers
from .serializers import AssignmentSerializer, ClassRoomSerializer, DocumentResultSerializer, DocumentSerializer, ExamSerializer, GradedAssignmentSerializer, LeaveRequestSerializer, NoteSerializer, RankingDocumentSerializer, SubjectEntrySerializer
# Utils
from .utils import get_student, get_classroom, hasAccessToSubject


no_access_to_subject_msg = "You do not have access to this subject"


class ClassroomAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = get_student(request=request)

        if(student == None):
            return Response("No Classroom Attached to Student", status=status.HTTP_401_UNAUTHORIZED)

        classroom = student.classroom

        classroom_json_data = ClassRoomSerializer(classroom).data

        return Response(classroom_json_data, status=status.HTTP_200_OK)


def getSubjectContent(request, ContentModel, ContentModelSerializer):
    student = get_student(request=request)

    if(student == None):
        return Response("No Classroom Attached to Student", status=status.HTTP_401_UNAUTHORIZED)

    subject_pk = request.query_params.get('subject_pk', None)
    if subject_pk == None:
        return Response("Subject pk not provided")
    elif not(subject_pk.isnumeric()):
        return Response("Subject pk should be numeric")

    subject = get_object_or_404(Subject, pk=subject_pk)

    if(subject):
        hasAccess = hasAccessToSubject(subject, student)

        if(hasAccess):
            subject_content = ContentModel.objects.filter(subject=subject)
            response_data = ContentModelSerializer(
                subject_content, many=True).data

            return Response(response_data)
        else:

            return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)

    else:
        return Response("No subject provided")


class NotesAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        response = getSubjectContent(request, Notes, NoteSerializer)
        return response


class DocumentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        response = getSubjectContent(request, Document, DocumentSerializer)
        return response


class AssignmentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        student = get_student(request=request)
        subject_pk = request.query_params.get("subject_pk", "None")

        if(not subject_pk.isnumeric()):
            return Response("Invalid Subject Pk its not provied or its a string", status=status.HTTP_400_BAD_REQUEST)

        subject = get_object_or_404(Subject, pk=subject_pk)

        hasAccess = hasAccessToSubject(subject, student)

        if(hasAccess):
            assignments = Assignment.objects.filter(subject=subject)

            def is_graded(assignment): return not(GradedAssignment.objects.filter(
                assignment=assignment, student=student).exists())
            non_graded_assignments = filter(is_graded, assignments)

            response_data = AssignmentSerializer(
                non_graded_assignments, many=True).data

            return Response(response_data)

        else:
            return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)


class GradedAssignmentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        student = get_student(request)

        assignment_id = data.get("assignment_id", None)

        if(assignment_id):

            assignment = get_object_or_404(Assignment, pk=assignment_id)
            assignment_questions = assignment.assignmentQuestions.all()

            assignment_subject = assignment.subject
            hasAccess = hasAccessToSubject(assignment_subject, student=student)

            if(hasAccess):

                hasSubmittedAlready = GradedAssignment.objects.filter(
                    assignment=assignment, student=student).exists()

                if(not hasSubmittedAlready):
                    questions_list = data.get("questions", [])
                    points = 0

                    for question in questions_list:

                        question_id = question.get("id", None)
                        ques_user_answer = question.get("answer", None)

                        try:
                            assignment_question = assignment_questions.get(
                                id=question_id)

                            if(assignment_question.answer.title == ques_user_answer):
                                points += 1

                        except Question.DoesNotExist as does_not_exist:
                            ...
                    created_graded_assignment = GradedAssignment.objects.create(
                        assignment=assignment, student=student, points=points)

                    graded_assignment_data = GradedAssignmentSerializer(
                        created_graded_assignment).data

                    graded_assignment_data['total_marks'] = len(
                        assignment_questions)

                    return Response(graded_assignment_data, status=status.HTTP_201_CREATED)
                else:

                    return Response("You can't submit again... :(", status=status.HTTP_401_UNAUTHORIZED)

            else:
                return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response("No assigment selected", status=status.HTTP_400_BAD_REQUEST)


class RankingDocumentAPI(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request):
        student = get_student(request=request)
        ranking_documents = student.ranking_documents.all()

        return ranking_documents

    def list(self, request, *args, **kwargs):
        student = get_student(request=request)
        ranking_documents = student.ranking_documents.filter(approved=True)

        ranking_documents_data = RankingDocumentSerializer(
            ranking_documents, many=True).data

        return Response(ranking_documents_data)

    def create(self, request, *args, **kwargs):
        formData = request.data
        ranking_document_form = RankingDocumentSerializer(data=formData)

        if(ranking_document_form.is_valid()):

            student = get_student(request)
            created_ranking_document = ranking_document_form.save(
                student=student)
            ranking_document_data = RankingDocumentSerializer(
                created_ranking_document).data

            return Response(ranking_document_data, status=status.HTTP_201_CREATED)

        else:
            return Response({"errors": ranking_document_form.errors}, status=status.HTTP_400_BAD_REQUEST)


class SubjectExamsResultAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        subject_pk = request.query_params.get("subject_pk", None)
        subject = get_object_or_404(Subject, pk=subject_pk)
        student = get_student(request)

        hasAccess = hasAccessToSubject(subject=subject, student=student)
        if(hasAccess):
            # Subject Exams Resul
            results = DocumentResult.objects.filter(exam__subject=subject)

            results_data = DocumentResultSerializer(results, many=True).data

            return Response(results_data)

        else:
            return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)


class LeaveRequestAPI(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        pass

    def create(self, request, *args, **kwargs):
        data = request.data
        student = get_student(request)

        leave_request_form = LeaveRequestSerializer(data=data)

        if(leave_request_form.is_valid()):
            leave_request = leave_request_form.save(student=student)
            response_data = LeaveRequestSerializer(leave_request).data

            return Response(response_data, status=status.HTTP_201_CREATED)

        else:
            errors = leave_request_form.errors

            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)


# Time table
# Ranking Graph
# Upcoming events
# Upcoming Examinations

class DashboardDataAPI(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        classroom = get_classroom(request=request)

        # TimeTable

        try:
            timetable = TimeTable.objects.get(classroom=classroom)
            subject_entries = SubjectEntry.objects.filter(
                timetable=timetable).order_by("start_time")

            timetable_data = SubjectEntrySerializer(
                subject_entries, many=True).data
            # timetable_data=SubjectEntrySeriazli( timetable.subject_entries.all())
        except Exception as e:
            timetable_data = []

        # upcoming Exams
        try:
            classroom_exams = classroom.exams.all()

            # Top 3
            upcoming_exams = classroom_exams.order_by("-exam_date")[:3]
            upcoming_exams_data = ExamSerializer(
                upcoming_exams, many=True).data

        except Exception as e:
            upcoming_exams_data = []

        # Graph Data

        try:
            # Getting current student
            graphData = {}

            student = get_student(request=request)
            ranking_documents = student.ranking_documents.filter(
                approved=True).order_by("created_date")

            document_counter = 0

            for ranking_document in ranking_documents:
                document_counter += 1
                # Getting month of the document
                ranking_document_month = ranking_document.created_at.strftime(
                    "%B")

                graphData[ranking_document_month] = document_counter

        except Exception as e:
            print(e)
            graphData = {"error": e}

        return Response({"timetable": timetable_data, "ranking_graph": graphData, "upcoming_exams": upcoming_exams_data}, status=status.HTTP_200_OK)
