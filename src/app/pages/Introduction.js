import { createElement } from "../../main/render";
import { Title, Paragraph } from "../components";

export const Introduction = () => (
  <div class="container">
    <Title>Build your own React</Title>

    <Paragraph>
      Hey! You probably already get accustomed to 
      the most popular frontend library - React
    </Paragraph>

    <Paragraph>
      Do you want to know how it works under the   hood?  
    </Paragraph>

    <Paragraph>
      This series of tutorials will help you
      create your own version of "React" - a simple one
    </Paragraph>

    <Paragraph>
      Real React uses things called fibers to control the flow of the app. 
      We won't be implementing it here
    </Paragraph>

    <Paragraph>
      Instead, this series will focus on understanding the core concepts of the 
      library - render process and reconciliation process
    </Paragraph>

    <Paragraph>
      After completing all chapters you can create your copy of this library and write 
      yourself a Todo! 
    </Paragraph>
  </div>
);