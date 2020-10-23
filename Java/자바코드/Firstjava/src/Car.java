
public class Car extends Vehicle {
    private String modelName;
    private int modelNo;
    
    public String getModelName() {
        return modelName;
    }
    
    public void setModelName(String modelName) {
        this.modelName = modelName;
    }
    
    public int getModelNo() {
        return modelNo;
    }
    
    public void setModelNo(int modelNo) {
        this.modelNo = modelNo;
    }
    
    public void accelerate() {
        System.out.println("가속크~~~~~~");
    }
}