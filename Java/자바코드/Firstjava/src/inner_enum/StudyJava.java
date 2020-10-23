package inner_enum;

public class StudyJava {
    public int a = 5;
    
    //내부클래스를 선언한 해당 외부클래스의 변수, 메소드를 사용할 수 있음
    //단, static키워드 사용시 접근 불가능
    class InnerTest {
        int b = 7;
        public int add() {
            return a+b;
        }
    }
}