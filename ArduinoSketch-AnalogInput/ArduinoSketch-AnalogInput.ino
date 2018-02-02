int readPinX = A0; // This is the pin number the knob is attached to
int readPinY = A1; // This is the pin number the knob is attached to
int X = 0;
int Y = 0; 
int newX = 0;
int newY = 0;

// setup() runs once to kick off the program
void setup() {
  Serial.begin(9600); // This connects to the serial port
}

// loop() runs repeadedly, forever.
void loop() {
  newX = analogRead(readPinX); delay(10); newX = analogRead(readPinX); delay(10);
  newY = analogRead(readPinY); delay(10); newY = analogRead(readPinY); delay(10);
  
  if(abs(newX-X) > 2 || abs(newY-Y) > 2){ // See if the value has changed by more than 2
    X = newX; // Update the value
    Y = newY; // Update the value

    String xprint = "";
    xprint += X;
    xprint += ',';
    xprint += Y;
    Serial.println(xprint); // Send the value over the serial port
  }
}
