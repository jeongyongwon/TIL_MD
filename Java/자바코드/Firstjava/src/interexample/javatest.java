package interexample;

public class javatest {
    public static void main(String[] args) {
        X500 x500 = new X500();
        System.out.println("주행거리"+ x500.start());
        x500.stop();
        x500.honk();
    }
}
