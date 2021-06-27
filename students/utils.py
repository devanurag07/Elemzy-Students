

def get_student(request):
    try:
        return request.user.student
    except Exception as e:
        return None


def get_classroom(request):
    try:
        student = get_student(request=request)
        classroom = student.classroom
        return classroom
    except Exception as e:
        return None


def hasAccessToSubject(subject, student):

    subject_classroom = subject.semester.classroom
    student_classroom = student.classroom

    if(subject_classroom == student_classroom):
        return True
    else:
        return False
