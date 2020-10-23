
public class javatest {
	
	//멤버변수 또는 속성
	final int fnlvar = 100;
	public int pblcvar;
	private int weight = 5;
	private int color = 5;
	
	//생성자
	//생성자는 class의 객체가 생성될 때 호출됩니다
	public javatest() {
		//주로 생성자에서 변수를 초기화를 해봅니다
		pblcvar = 3;
		System.out.println("생성자를 호출했습니다.");
		
 	}
	
	//메소드 또는 함수처럼 매개변수(parameter)를 가지는 생성자
	public javatest(int pblcvar) {
		
		//this는 Class로 생성될 객체를 지원한다.
		this.pblcvar = pblcvar;
		
	}
	
	
	public javatest(int pblcvar, int weight) {
		//this는 Class로 생성될 객체를 지원한다.
		this.pblcvar = pblcvar;
		setWeight(weight);
	}
	
	// 생성자 이후에 메소드를 적어주는 것이 보통
	// 메소드
	public int getWeight() {
		return weight;
	}
	
	public void setWeight(int weight) {
		this.weight = weight;
	}
	
}
