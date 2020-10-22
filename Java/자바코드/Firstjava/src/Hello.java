
public class Hello {

	
    static void myFunction() {
        System.out.println("return값이 없음, 매개변수 없음");
    }

    int myAdd(int a, int b) {
        int c;
        c = a+b;
        return c;
    }

    static void myAdd(String a, int b) {

    }
        
    public static void main(String[] args) {
		Hello.myFunction();
         Hello hi = new Hello();
        int result = hi.myAdd(1,6);
        System.out.println("더한 값은"+result);
    }        
	

}