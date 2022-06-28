
public class CreateRegistrationRequestModel
{
    public string RequestId { get; set; }
    public Student student { get; set; }
    public Course course { get; set; }
    public Offering offering { get; set; }
    public DateTime created { get; set; }
}

public class Student
{
    public string email { get; set; }
    public string id { get; set; }
}

public class Course
{
    public string courseId { get; set; }
    public string courseName { get; set; }
    public int numberOfDays { get; set; }
}

public class Offering
{
    public string offeringId { get; set; }
    public DateTime startDate { get; set; }
    public int numberOfDays { get; set; }
}
