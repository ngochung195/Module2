import java.util.Scanner;

public class LinearEquationResolver {
    public static void main(String[] args) {
        System.out.println("Giải phương trình bậc nhất");
        System.out.println("Cho phương trình 'a * x + b = c', vui lòng nhập các hằng số: ");

        Scanner scanner = new Scanner(System.in);

        System.out.print("a: ");
        double a = scanner.nextDouble();

        System.out.print("b: ");
        double b = scanner.nextDouble();

        System.out.print("c: ");
        double c = scanner.nextDouble();

        if (a != 0){
            double answer = (c-b) / a;
            System.out.printf("Nghiệm của phương trình x = %f!\n ", answer);
        } else {
            if (b == c){
                System.out.println("Phương trình đúng với mọi x!");
            } else {
                System.out.println("Phương trình vô nghiệm!");
            }
        }
    }
}
