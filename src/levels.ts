import { vec2 } from 'gl-matrix';
import { IMAGES } from './images';
import { Const } from './utils';
import { renderGUI } from './render'


export const LEVEL_STRINGS = [
'eyJwb2x5cyI6W3sicG9pbnRzIjpbeyIwIjowLCIxIjoyMjA1fSx7IjAiOjEyMCwiMSI6MjExNn0seyIwIjoyMTUsIjEiOjIyNDh9LHsiMCI6MjU5LCIxIjoyNDkyfSx7IjAiOjQzNCwiMSI6MjYxOX0seyIwIjo0NTAsIjEiOjI3MzV9LHsiMCI6LTI5LCIxIjoyNzM2fV19LHsicG9pbnRzIjpbeyIwIjo0MDcsIjEiOjI2NTd9LHsiMCI6OTMzLCIxIjoyNjUxfSx7IjAiOjEwODIsIjEiOjI3MDd9LHsiMCI6OTk5LCIxIjoyNzQxfSx7IjAiOjMyMiwiMSI6MjczNn1dfSx7InBvaW50cyI6W3siMCI6OTg4LCIxIjoyNjc2fSx7IjAiOjExNDQsIjEiOjI0NzV9LHsiMCI6MTE2MCwiMSI6MjE1NH0seyIwIjoxMjY5LCIxIjoyMDg1fSx7IjAiOjE0NjUsIjEiOjIwNzJ9LHsiMCI6MTQ4MiwiMSI6MjI0NX0seyIwIjoxNTQ1LCIxIjoyNDQ4fSx7IjAiOjE1ODMsIjEiOjI1Mjh9LHsiMCI6MTUxMywiMSI6MjczOH0seyIwIjo5MzAsIjEiOjI3NDJ9XX0seyJwb2ludHMiOlt7IjAiOjE0NjAsIjEiOjIyNTh9LHsiMCI6MTY2NywiMSI6MjE5Mn0seyIwIjoxOTEwLCIxIjoyMjE4fSx7IjAiOjE5MzIsIjEiOjIzMTR9LHsiMCI6MTc4NywiMSI6MjQ1Mn0seyIwIjoxNTg4LCIxIjoyNDE2fSx7IjAiOjE1ODQsIjEiOjI1Mjh9LHsiMCI6MTcwNSwiMSI6Mjc0NX0seyIwIjoxMTg2LCIxIjoyNzM4fV19LHsicG9pbnRzIjpbeyIwIjoxNTUwLCIxIjoyNjQ5fSx7IjAiOjE3OTgsIjEiOjI2MTR9LHsiMCI6MTkyNywiMSI6MjcwMH0seyIwIjoyMjA3LCIxIjoyNjkyfSx7IjAiOjIyNzIsIjEiOjI3NDl9LHsiMCI6MTUxMSwiMSI6Mjc0Nn1dfSx7InBvaW50cyI6W3siMCI6MTgyLCIxIjoyMjUzfSx7IjAiOjI2MiwiMSI6MjIyMn0seyIwIjo0MjEsIjEiOjIyMzF9LHsiMCI6Mzk3LCIxIjoyMzU0fSx7IjAiOjE2NywiMSI6MjQzOH0seyIwIjo5MCwiMSI6MjY2Nn0seyIwIjotMTMsIjEiOjI2NzF9XX0seyJwb2ludHMiOlt7IjAiOjIwNTIsIjEiOjI2OTJ9LHsiMCI6MjEzNywiMSI6MjUxOH0seyIwIjoyMzE3LCIxIjoyNDc0fSx7IjAiOjIzNTYsIjEiOjIyNzh9LHsiMCI6MjQ0NywiMSI6MjMyMX0seyIwIjoyNDQ3LCIxIjoyNzMxfSx7IjAiOjIwNDIsIjEiOjI3MzV9XX0seyJwb2ludHMiOlt7IjAiOi0xNywiMSI6MTgwMH0seyIwIjoxNjgsIjEiOjE2NDh9LHsiMCI6NjY4LCIxIjoxNjIwfSx7IjAiOjcwOSwiMSI6MTUzN30seyIwIjo3MDcsIjEiOjE0NjR9LHsiMCI6NTgwLCIxIjoxMzg5fSx7IjAiOi0yNywiMSI6MTI1Nn1dfSx7InBvaW50cyI6W3siMCI6MjQwNywiMSI6MTU4Nn0seyIwIjoyMTEwLCIxIjoxNTEwfSx7IjAiOjIwNjUsIjEiOjEzNzJ9LHsiMCI6MTkxOSwiMSI6MTI4OH0seyIwIjoxNzM3LCIxIjoxMjc0fSx7IjAiOjE3MDEsIjEiOjExMzN9LHsiMCI6MTYyNCwiMSI6MTA1NX0seyIwIjoxNjkxLCIxIjo5Njh9LHsiMCI6MTg0MSwiMSI6OTM2fSx7IjAiOjIwNzUsIjEiOjkzNn0seyIwIjoyMTczLCIxIjo5MTR9LHsiMCI6MjQxNywiMSI6OTIwfV19XSwib2JqZWN0cyI6W3sia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDMucG5nIiwicG9zIjp7IjAiOjIwLCIxIjoyMTA5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMS5wbmciLCJwb3MiOnsiMCI6NDY2LCIxIjoyNTUwfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNC5wbmciLCJwb3MiOnsiMCI6Nzk0LCIxIjoyNTc1fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNy5wbmciLCJwb3MiOnsiMCI6NDAyLCIxIjoyNTk5fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsOS5wbmciLCJwb3MiOnsiMCI6MjQ1LCIxIjoyNDM3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6OTU5LCIxIjoyNjI5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MzQ5LCIxIjoyNTM2fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTMwMywiMSI6MjA1MH19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTQucG5nIiwicG9zIjp7IjAiOjExNjcsIjEiOjIwNTl9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUyLnBuZyIsInBvcyI6eyIwIjoyNjgsIjEiOjIxNTJ9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjo2NywiMSI6MjEwNH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDIucG5nIiwicG9zIjp7IjAiOjE2NSwiMSI6MjE5NH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDUucG5nIiwicG9zIjp7IjAiOjEwOTcsIjEiOjI0NDF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWw1LnBuZyIsInBvcyI6eyIwIjozNzIsIjEiOjIxODF9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmU1LnBuZyIsInBvcyI6eyIwIjoxNjQ2LCIxIjoyNDQ4fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNi5wbmciLCJwb3MiOnsiMCI6MTkwMywiMSI6MjY2MX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDcucG5nIiwicG9zIjp7IjAiOjE2MDQsIjEiOjI1ODh9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWw3LnBuZyIsInBvcyI6eyIwIjoxNjg3LCIxIjoyNTgwfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsOS5wbmciLCJwb3MiOnsiMCI6MTc0MiwiMSI6MjU1MX19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTMucG5nIiwicG9zIjp7IjAiOjIyODksIjEiOjI0NDV9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjoxNzc1LCIxIjoyMTg3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlNC5wbmciLCJwb3MiOnsiMCI6MTQ3NywiMSI6MjE2OH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDExLnBuZyIsInBvcyI6eyIwIjoxNjg4LCIxIjoyMTMxfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTEucG5nIiwicG9zIjp7IjAiOjE5NTksIjEiOjI2Mjl9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMS5wbmciLCJwb3MiOnsiMCI6ODk5LCIxIjoyNTg2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjczNiwiMSI6MjU0Nn19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjo0NTYsIjEiOjI1NTV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMi5wbmciLCJwb3MiOnsiMCI6MjQzLCIxIjoyMTI0fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjEzODcsIjEiOjE5NzF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMy5wbmciLCJwb3MiOnsiMCI6MTIzNywiMSI6MjA1M319LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEzLnBuZyIsInBvcyI6eyIwIjoxNjAxLCIxIjoyMTY1fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTMucG5nIiwicG9zIjp7IjAiOjIzODgsIjEiOjIyNjN9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNC5wbmciLCJwb3MiOnsiMCI6MjEzNSwiMSI6MjQ2OH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjoyMTg4LCIxIjoyMzk3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlNC5wbmciLCJwb3MiOnsiMCI6MTU2LCIxIjoxMjMyfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6NTkyLCIxIjoxMzgxfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTQsIjEiOjEyNDV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNS5wbmciLCJwb3MiOnsiMCI6MzMwLCIxIjoxMjc4fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTUucG5nIiwicG9zIjp7IjAiOjY2OCwiMSI6MTM4OX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDE2LnBuZyIsInBvcyI6eyIwIjo2MjAsIjEiOjEzNzV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNy5wbmciLCJwb3MiOnsiMCI6LTM4LCIxIjoxMjA5fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjkxLCIxIjoxMTg2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjQ4NywiMSI6MTI4N319LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTQucG5nIiwicG9zIjp7IjAiOjIyMjIsIjEiOjg1Mn19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTIucG5nIiwicG9zIjp7IjAiOjE3MDMsIjEiOjg4OX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDExLnBuZyIsInBvcyI6eyIwIjoxODI4LCIxIjo4NzR9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMS5wbmciLCJwb3MiOnsiMCI6MjI3MywiMSI6ODU0fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjIxNTksIjEiOjgxN319LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjoxODY0LCIxIjo4NDF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMC5wbmciLCJwb3MiOnsiMCI6MjMzMCwiMSI6ODY4fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MzgwLCIxIjoxMzI5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MjA5MSwiMSI6OTAwfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTkwNCwiMSI6OTA3fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjE5MzgsIjEiOjgzMn19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTMucG5nIiwicG9zIjp7IjAiOjIwMDgsIjEiOjI2NjV9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjoxODMyLCIxIjoyNjI2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTQucG5nIiwicG9zIjp7IjAiOjExNDIsIjEiOjIyNTF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNC5wbmciLCJwb3MiOnsiMCI6MTEzMiwiMSI6MjI5Mn19XX0=',
'eyJwb2x5cyI6W3sicG9pbnRzIjpbeyIwIjowLCIxIjoyMjA1fSx7IjAiOjEyMCwiMSI6MjExNn0seyIwIjoyMTUsIjEiOjIyNDh9LHsiMCI6MjU5LCIxIjoyNDkyfSx7IjAiOjQzNCwiMSI6MjYxOX0seyIwIjo0NTAsIjEiOjI3MzV9LHsiMCI6LTI5LCIxIjoyNzM2fV19LHsicG9pbnRzIjpbeyIwIjo0MDcsIjEiOjI2NTd9LHsiMCI6OTMzLCIxIjoyNjUxfSx7IjAiOjEwODIsIjEiOjI3MDd9LHsiMCI6OTk5LCIxIjoyNzQxfSx7IjAiOjMyMiwiMSI6MjczNn1dfSx7InBvaW50cyI6W3siMCI6OTg4LCIxIjoyNjc2fSx7IjAiOjExNDQsIjEiOjI0NzV9LHsiMCI6MTE2MCwiMSI6MjE1NH0seyIwIjoxMjY5LCIxIjoyMDg1fSx7IjAiOjE0NjUsIjEiOjIwNzJ9LHsiMCI6MTQ4MiwiMSI6MjI0NX0seyIwIjoxNTQ1LCIxIjoyNDQ4fSx7IjAiOjE1ODMsIjEiOjI1Mjh9LHsiMCI6MTUxMywiMSI6MjczOH0seyIwIjo5MzAsIjEiOjI3NDJ9XX0seyJwb2ludHMiOlt7IjAiOjE0NjAsIjEiOjIyNTh9LHsiMCI6MTY2NywiMSI6MjE5Mn0seyIwIjoxOTEwLCIxIjoyMjE4fSx7IjAiOjE5MzIsIjEiOjIzMTR9LHsiMCI6MTc4NywiMSI6MjQ1Mn0seyIwIjoxNTg4LCIxIjoyNDE2fSx7IjAiOjE1ODQsIjEiOjI1Mjh9LHsiMCI6MTcwNSwiMSI6Mjc0NX0seyIwIjoxMTg2LCIxIjoyNzM4fV19LHsicG9pbnRzIjpbeyIwIjoxNTUwLCIxIjoyNjQ5fSx7IjAiOjE3OTgsIjEiOjI2MTR9LHsiMCI6MTkyNywiMSI6MjcwMH0seyIwIjoyMjA3LCIxIjoyNjkyfSx7IjAiOjIyNzIsIjEiOjI3NDl9LHsiMCI6MTUxMSwiMSI6Mjc0Nn1dfSx7InBvaW50cyI6W3siMCI6MTgyLCIxIjoyMjUzfSx7IjAiOjI2MiwiMSI6MjIyMn0seyIwIjo0MjEsIjEiOjIyMzF9LHsiMCI6Mzk3LCIxIjoyMzU0fSx7IjAiOjE2NywiMSI6MjQzOH0seyIwIjo5MCwiMSI6MjY2Nn0seyIwIjotMTMsIjEiOjI2NzF9XX0seyJwb2ludHMiOlt7IjAiOjIwNTIsIjEiOjI2OTJ9LHsiMCI6MjEzNywiMSI6MjUxOH0seyIwIjoyMzE3LCIxIjoyNDc0fSx7IjAiOjIzNTYsIjEiOjIyNzh9LHsiMCI6MjQ0NywiMSI6MjMyMX0seyIwIjoyNDQ5LCIxIjoyNzQ4fSx7IjAiOjIwMjYsIjEiOjI3NDl9XX0seyJwb2ludHMiOlt7IjAiOi0xNywiMSI6MTgwMH0seyIwIjoxNjgsIjEiOjE2NDh9LHsiMCI6NjY4LCIxIjoxNjIwfSx7IjAiOjcwOSwiMSI6MTUzN30seyIwIjo3MDcsIjEiOjE0NjR9LHsiMCI6NTgwLCIxIjoxMzg5fSx7IjAiOi0yNywiMSI6MTI1Nn1dfSx7InBvaW50cyI6W3siMCI6MjQwNywiMSI6MTU4Nn0seyIwIjoyMTEwLCIxIjoxNTEwfSx7IjAiOjIwNjUsIjEiOjEzNzJ9LHsiMCI6MTkxOSwiMSI6MTI4OH0seyIwIjoxNzM3LCIxIjoxMjc0fSx7IjAiOjE3MDEsIjEiOjExMzN9LHsiMCI6MTYyNCwiMSI6MTA1NX0seyIwIjoxNjkxLCIxIjo5Njh9LHsiMCI6MTg0MSwiMSI6OTM2fSx7IjAiOjIwNzUsIjEiOjkzNn0seyIwIjoyMTczLCIxIjo5MTR9LHsiMCI6MjQxNywiMSI6OTIwfV19LHsicG9pbnRzIjpbeyIwIjotNywiMSI6MTcyNH0seyIwIjoyNywiMSI6MTkzMX0seyIwIjowLCIxIjoyMDM1fSx7IjAiOjEyLCIxIjoyMjEwfSx7IjAiOjIxLCIxIjoyMzE4fSx7IjAiOjExMywiMSI6Mjc0N30seyIwIjotNDgsIjEiOjI3NDV9LHsiMCI6LTQ3LCIxIjoxNzAzfV19LHsicG9pbnRzIjpbeyIwIjotNDYsIjEiOjQyNn0seyIwIjoxLCIxIjo2MDB9LHsiMCI6ODQsIjEiOjg5OH0seyIwIjotNDgsIjEiOjEwMDV9XX0seyJwb2ludHMiOlt7IjAiOjM3LCIxIjo4NzN9LHsiMCI6NzIsIjEiOjk5NX0seyIwIjotNywiMSI6MTE3NX0seyIwIjotNiwiMSI6MTMwNX0seyIwIjotMSwiMSI6MTc0NH0seyIwIjotNDgsIjEiOjE3MjJ9LHsiMCI6LTUwLCIxIjo4NTR9XX0seyJwb2ludHMiOlt7IjAiOjIzNjYsIjEiOjEzODd9LHsiMCI6MjMzMSwiMSI6MTc1MX0seyIwIjoyMzg5LCIxIjoyMDYxfSx7IjAiOjIzNzYsIjEiOjIxMjJ9LHsiMCI6MjQwNSwiMSI6MjM2N30seyIwIjoyNDQ5LCIxIjoyNzQ0fSx7IjAiOjI0NDQsIjEiOjkyMn1dfSx7InBvaW50cyI6W3siMCI6MjQzNCwiMSI6NDM5fSx7IjAiOjIzNjcsIjEiOjU3M30seyIwIjoyMzg2LCIxIjo2ODZ9LHsiMCI6MjM3NywiMSI6ODQyfSx7IjAiOjIzOTUsIjEiOjg5Mn0seyIwIjoyMzcyLCIxIjoxMDg0fSx7IjAiOjI0NDcsIjEiOjExNjN9LHsiMCI6MjQ0NiwiMSI6NDIyfV19XSwib2JqZWN0cyI6W3sia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDMucG5nIiwicG9zIjp7IjAiOjIwLCIxIjoyMTA5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMS5wbmciLCJwb3MiOnsiMCI6NDY2LCIxIjoyNTUwfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNC5wbmciLCJwb3MiOnsiMCI6Nzk0LCIxIjoyNTc1fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNy5wbmciLCJwb3MiOnsiMCI6NDAyLCIxIjoyNTk5fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsOS5wbmciLCJwb3MiOnsiMCI6MjQ1LCIxIjoyNDM3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6OTU5LCIxIjoyNjI5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MzQ5LCIxIjoyNTM2fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTMwMywiMSI6MjA1MH19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTQucG5nIiwicG9zIjp7IjAiOjExNjcsIjEiOjIwNTl9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUyLnBuZyIsInBvcyI6eyIwIjoyNjgsIjEiOjIxNTJ9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjo2NywiMSI6MjEwNH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDIucG5nIiwicG9zIjp7IjAiOjE2NSwiMSI6MjE5NH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDUucG5nIiwicG9zIjp7IjAiOjEwOTcsIjEiOjI0NDF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWw1LnBuZyIsInBvcyI6eyIwIjozNzIsIjEiOjIxODF9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmU1LnBuZyIsInBvcyI6eyIwIjoxNjQ2LCIxIjoyNDQ4fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsNi5wbmciLCJwb3MiOnsiMCI6MTkwMywiMSI6MjY2MX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDcucG5nIiwicG9zIjp7IjAiOjE2MDQsIjEiOjI1ODh9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWw3LnBuZyIsInBvcyI6eyIwIjoxNjg3LCIxIjoyNTgwfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsOS5wbmciLCJwb3MiOnsiMCI6MTc0MiwiMSI6MjU1MX19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTMucG5nIiwicG9zIjp7IjAiOjIyODksIjEiOjI0NDV9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjoxNzc1LCIxIjoyMTg3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlNC5wbmciLCJwb3MiOnsiMCI6MTQ3NywiMSI6MjE2OH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDExLnBuZyIsInBvcyI6eyIwIjoxNjg4LCIxIjoyMTMxfX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTEucG5nIiwicG9zIjp7IjAiOjE5NTksIjEiOjI2Mjl9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMS5wbmciLCJwb3MiOnsiMCI6ODk5LCIxIjoyNTg2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjczNiwiMSI6MjU0Nn19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjo0NTYsIjEiOjI1NTV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMi5wbmciLCJwb3MiOnsiMCI6MjQzLCIxIjoyMTI0fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjEzODcsIjEiOjE5NzF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMy5wbmciLCJwb3MiOnsiMCI6MTIzNywiMSI6MjA1M319LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEzLnBuZyIsInBvcyI6eyIwIjoxNjAxLCIxIjoyMTY1fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTMucG5nIiwicG9zIjp7IjAiOjIzNjAsIjEiOjIyNDV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNC5wbmciLCJwb3MiOnsiMCI6MjEzNSwiMSI6MjQ2OH19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjoyMTg4LCIxIjoyMzk3fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlNC5wbmciLCJwb3MiOnsiMCI6MTU2LCIxIjoxMjMyfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6NTkyLCIxIjoxMzgxfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTQsIjEiOjEyNDV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNS5wbmciLCJwb3MiOnsiMCI6MzMwLCIxIjoxMjc4fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTUucG5nIiwicG9zIjp7IjAiOjY2OCwiMSI6MTM4OX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDE2LnBuZyIsInBvcyI6eyIwIjo2MjAsIjEiOjEzNzV9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNy5wbmciLCJwb3MiOnsiMCI6LTM4LCIxIjoxMjA5fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjkxLCIxIjoxMTg2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjQ4NywiMSI6MTI4N319LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTQucG5nIiwicG9zIjp7IjAiOjIyMjIsIjEiOjg1Mn19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTIucG5nIiwicG9zIjp7IjAiOjE3MDMsIjEiOjg4OX19LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDExLnBuZyIsInBvcyI6eyIwIjoxODI4LCIxIjo4NzR9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMS5wbmciLCJwb3MiOnsiMCI6MjI3MywiMSI6ODU0fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjIxNTksIjEiOjgxN319LHsia2luZCI6ImNvcmFsIiwiaW1hZ2UiOiJDb3JhbDEyLnBuZyIsInBvcyI6eyIwIjoxODY0LCIxIjo4NDF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxMC5wbmciLCJwb3MiOnsiMCI6MjMzMCwiMSI6ODY4fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MzgwLCIxIjoxMzI5fX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MjA5MSwiMSI6OTAwfX0seyJraW5kIjoidHJlYXN1cmUiLCJpbWFnZSI6IlRyZWFzdXJlMy5wbmciLCJwb3MiOnsiMCI6MTkwNCwiMSI6OTA3fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTIucG5nIiwicG9zIjp7IjAiOjE5MzgsIjEiOjgzMn19LHsia2luZCI6InRyZWFzdXJlIiwiaW1hZ2UiOiJUcmVhc3VyZTMucG5nIiwicG9zIjp7IjAiOjIwMDgsIjEiOjI2NjV9fSx7ImtpbmQiOiJ0cmVhc3VyZSIsImltYWdlIjoiVHJlYXN1cmUzLnBuZyIsInBvcyI6eyIwIjoxODMyLCIxIjoyNjI2fX0seyJraW5kIjoiY29yYWwiLCJpbWFnZSI6IkNvcmFsMTQucG5nIiwicG9zIjp7IjAiOjExNDIsIjEiOjIyNTF9fSx7ImtpbmQiOiJjb3JhbCIsImltYWdlIjoiQ29yYWwxNC5wbmciLCJwb3MiOnsiMCI6MTEzMiwiMSI6MjI5Mn19XX0=',
];

export type LevelPoly =
{
    points: vec2[],
};

export const LevelPoly =
{
    create(): LevelPoly
    {
        return {
            points: [],
        };
    }
};

export type LevelObject =
{
    kind: 'coral' | 'treasure',
    image: string,
    pos: vec2,
};

export type LevelDef =
{
    polys: LevelPoly[],
    objects: LevelObject[],
};

export type CollisionResult =
{
    hit: boolean,
    restoredPos: vec2,
    touchedObjects: Const<LevelObject>[],
};

export const LevelDef =
{
    create(): LevelDef
    {
        return {
            polys: [],
            objects: [],
        };
    },

    save( self: LevelDef ): string
    {
        return btoa( JSON.stringify( self ) );
    },

    load( level: string ): LevelDef
    {
        return JSON.parse( atob( level )) as LevelDef;
    },

    collide( level: Const<LevelDef>, pos: vec2, radius: number ): CollisionResult
    {
        const result: CollisionResult = {
            hit: false,
            restoredPos: vec2.clone( pos ),
            touchedObjects: [],
        };

        let bestQ: vec2 = vec2.create();

        const p = vec2.clone( pos );

        for( let i = 0 ; i < 10 ; ++i )
        for( const poly of level.polys )
            for( let i = 0; i < poly.points.length; ++i )
            {
                collideLine( p, radius, poly.points[i] as vec2, poly.points[(i+1)%poly.points.length] as vec2, result, bestQ );
                vec2.copy( p, result.restoredPos );
            }

        for( const obj of level.objects )
        {
            const w =IMAGES[obj.image].width;
            const h = IMAGES[obj.image].height;
            const op = vec2.fromValues( obj.pos[0] + w/2, obj.pos[1] + h/2 );
            const or = (w + h) / 2;
            if( vec2.squaredDistance( op, pos ) < or*or )
                result.touchedObjects.push( obj );
        }

        return result;
    },
};

const collideLine = ( p: vec2, radius: number, v: vec2, w: vec2, out: CollisionResult, bestQ: vec2 ): void =>
{
    function sqr(x: number) { return x * x }
    function dist2(v: vec2, w: vec2) { return sqr(v[0] - w[0]) + sqr(v[1] - w[1]) }

    var l2 = dist2(v, w);
    var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;

    let q = vec2.create();
    if( t <= 0 ) q = v;
    else if( t >= 1 ) q = w;
    else {
        t = Math.max(0, Math.min(1, t));
        q[0] = v[0] + t * (w[0] - v[0]);
        q[1] = v[1] + t * (w[1] - v[1]);
    }

    const d2_0 = dist2( p, q );
    const d2_1 = dist2( p, bestQ );

    if( d2_0 < d2_1 && d2_0 <= radius * radius )
    {
        const a = vec2.sub( vec2.create(), p, q );
        vec2.normalize( a, a );
        vec2.scale( a, a, radius );
        vec2.add( a, a, q );

        out.hit = true;
        out.restoredPos = a;
        out.touchedObjects = [];

        vec2.copy( bestQ, q );
    }
};

export const drawLevel = ( ctx: CanvasRenderingContext2D, camera: Const<vec2>, level: Const<LevelDef>, outlines: boolean, pass: number ): void =>
{
    if( pass === 0 )
    {
        ctx.clearRect( 0, 0, 1280, 720 );
        ctx.drawImage( IMAGES['bg__.png'], outlines ? -camera[0] : 0, -camera[1] );
    }
    else if( pass === 1 )
    {

        if( outlines )
            ctx.strokeStyle = '#ff0';

        ctx.fillStyle = ctx.createPattern(IMAGES['floor__.png'], 'repeat')!;
        for( const poly of level.polys )
        {
            ctx.save();
            ctx.translate(-camera[0], -camera[1]);
            ctx.beginPath();
            ctx.moveTo( poly.points[poly.points.length-1][0], poly.points[poly.points.length-1][1]);
            for( let i = 0; i < poly.points.length; ++i )
                ctx.lineTo( poly.points[i][0], poly.points[i][1]);
            ctx.fill();
            if( outlines )
                ctx.stroke();
            ctx.restore();
        }

        for( const obj of level.objects )
        {
            ctx.save();
            ctx.translate(-camera[0], -camera[1]);
            ctx.drawImage(IMAGES[obj.image], obj.pos[0], obj.pos[1]);
            if( outlines )
            {
                ctx.beginPath();
                ctx.arc( obj.pos[0], obj.pos[1], 10, 0, 2*Math.PI );
                ctx.stroke();
            }
            ctx.restore();
        }

        ctx.drawImage( IMAGES['WaterOverlay.png'], outlines ? -camera[0] : 0, -camera[1] );
        ctx.drawImage( IMAGES['WavesWaterTop.png'], outlines ? -camera[0] : 0, -camera[1] );

        if(camera[1] > 700)
        {
            for(let i=0; i < 20; i++) {
                ctx.save();
                let alpha = 0.1 * (Math.sin((performance.now() * Math.sqrt(i) ) / 400.0) + 1) / 2;
                alpha = alpha * Math.min(Math.max((camera[1]-700.0) / 300.0, 0.0), 1.0);
                //console.log(alpha)
                ctx.globalAlpha = alpha;
                //ctx.rotate(0.2 + i)
                ctx.drawImage(IMAGES['beam.png'], (Math.sin(performance.now() / (50000.0 + i*19))) * 1600 + (((i-20) * 17837) % 1600), -50);
                //ctx.globalAlpha = 1;
                ctx.restore();
            }
        }
    }


    // overlay section of drawing

    renderGUI('O2Meter.png', 100, 100, 0, 0.1);
    renderGUI('O2MeterDial.png', 100, 100, Math.sin(performance.now() / 100.0), 0.1);
    renderGUI('O2MeterLens.png', 100, 100, 0, 0.1);

};
