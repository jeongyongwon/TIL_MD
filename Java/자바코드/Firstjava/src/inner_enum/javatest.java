package inner_enum;

public class javatest {
    public static void main(String[] args) {
        StudyJava studyJava = new StudyJava();
        StudyJava.InnerTest innertest = studyJava.new InnerTest();
        System.out.println("더한 값은?"+innertest.add());
        
        
    }
}