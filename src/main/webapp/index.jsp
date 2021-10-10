<%@ page import="data.Result" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en-US">
<%
    ArrayList<Result> results = new ArrayList<>();
    if (request.getSession().getAttribute("results") != null) {
        results = (ArrayList<Result>) request.getSession().getAttribute("results");
    }
%>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web Lab #2</title>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery.svg.js"></script>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.svg.css">
</head>
<body>
<table id="grid" width="100%">
    <tr class="header">
        <th class="header-cell">
            Bogatov Aleksandr Sergeevich
        </th>
        <th class="header-cell">
            Group: P3233
        </th>
        <th class="header-cell">
            Variant: 33673
        </th>
    </tr>
    <tr class="main-content">
        <td width="50%" id="graph-cell" class="graph">
            <canvas id="graph-canvas" width="360" height="360"></canvas>
            <svg id="graph-svg" width="360" height="360" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <line class="graph-base" stroke="white" x1="180" x2="180" y1="0" y2="360" stroke-width="3"/>
                <line class="graph-base" stroke="white" x1="0" x2="360" y1="180" y2="180" stroke-width="3"/>
                <rect id="section-3" class="paint" x="28" y="182" width="150" height="150" fill-opacity="0.8"/>
                <polygon id="section-2" class="paint" points="178 178, 178 30, 30 178" fill-opacity="0.8"/>
                <path id="section-1" class="paint" d="M182,178 L330,178   A200,200 0 0,0    182,30  z"
                      fill-opacity="0.8"/>
                <polygon class="graph-base" points="180 0, 185 25, 175 25" stroke="white" stroke-width="1"/>
                <polygon class="graph-base" points="360 180, 340 185, 340 175" stroke="white" stroke-width="1"/>
                <line name="mid-up" class="graph-base" stroke="white" stroke-width="2" x1="173" x2="187" y1="30"
                      y2="30"/>
                <line name="mid-up" class="graph-base" stroke="white" stroke-width="2" x1="173" x2="187" y1="105"
                      y2="105"/>
                <line name="mid-low" class="graph-base" stroke="white" stroke-width="2" x1="173" x2="187" y1="255"
                      y2="255"/>
                <line name="mid-low" class="graph-base" stroke="white" stroke-width="2" x1="173" x2="187" y1="331"
                      y2="331"/>
                <line name="left" class="graph-base" stroke="white" stroke-width="2" x1="30" x2="30" y1="173" y2="187"/>
                <line name="left" class="graph-base" stroke="white" stroke-width="2" x1="105" x2="105" y1="173"
                      y2="187"/>
                <line name="right" class="graph-base" stroke="white" stroke-width="2" x1="255" x2="255" y1="173"
                      y2="187"/>
                <line name="right" class="graph-base" stroke="white" stroke-width="2" x1="330" x2="330" y1="173"
                      y2="187"/>
                <text class="graph-base" fill="white" x="350" y="170">X</text>
                <text class="graph-base" fill="white" x="160" y="20">Y</text>
                <text name="mid-up-text" class="graph-base" fill="white" x="193" y="35">R</text>
                <text name="mid-up-text" class="graph-base" fill="white" x="193" y="110">R/2</text>
                <text name="mid-low-text" class="graph-base" fill="white" x="193" y="260">-R/2</text>
                <text name="mid-low-text" class="graph-base" fill="white" x="193" y="335">-R</text>
                <text name="right-text" class="graph-base" fill="white" x="325" y="167">R</text>
                <text name="right-text" class="graph-base" fill="white" x="245" y="167">R/2</text>
                <text name="left-text" class="graph-base" fill="white" x="100" y="167">-R/2</text>
                <text name="left-text" class="graph-base" fill="white" x="20" y="167">-R</text>
                <%
                    for (int i = 0; i < results.size(); i++) {
                        Result result = results.get(i);
                %>
                <circle cx="<%=180+150*result.getX()/Math.abs(result.getR())%>"
                        cy="<%=180-150*result.getY()/Math.abs(result.getR())%>"
                        data-x="<%=result.getX()%>" data-y="<%=result.getY()%>" data-r="<%=result.getR()%>"
                        data-hit="<%=result.getHit()%>" r="5"
                        name="pointer" class="pointer"></circle>
                <%
                    }
                %>
            </svg>
        </td>
        <td width="40%" id="choice-cell" class="choice">
            <form method="post" id="input-form" action="/Lab2-1.0-SNAPSHOT">
                <table>
                    <tr>
                        <td>
                            <fieldset>
                                <p id="error-info">Enter your values or click on the graph</p>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-y">
                            <fieldset id="y-field">
                                <label for="y">Input Y value</label>
                                <input maxlength="10" size="22" type="text" id="y" name="y"
                                       placeholder="Y must be in the range of (-3;3)"><br>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-x">
                            <fieldset id="x-field">
                                <label>Select X value</label>
                                <input type="radio" name="x" value="-4">-4
                                <input type="radio" name="x" value="-3">-3
                                <input type="radio" name="x" value="-2">-2
                                <input type="radio" name="x" value="-1">-1
                                <input type="radio" name="x" value="0">0
                                <input type="radio" name="x" value="1">1
                                <input type="radio" name="x" value="2">2
                                <input type="radio" name="x" value="3">3
                                <input type="radio" name="x" value="4">4
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-r">
                            <fieldset id="r-field">
                                <label>Select R value</label>
                                <input type="checkbox" name="r" value="1">1
                                <input type="checkbox" name="r" value="2">2
                                <input type="checkbox" name="r" value="3">3
                                <input type="checkbox" name="r" value="4">4
                                <input type="checkbox" name="r" value="5">5
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset>
                                <table class="comm-button-table">
                                    <tr>
                                        <td colspan="1">
                                            <input id="send" class="input-button" type="submit" value="Submit">
                                            <input type="hidden" value="" name="canvas-x" id="x-hid">
                                            <input type="hidden" value="" name="canvas-y" id="y-hid">
                                        </td>
                                        <td colspan="1">
                                            <input id="res" class="input-button" type="reset" value="Reset">
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
        <td width="10%" id="request-cell" class="request-button-table">
            <form method="post" action="/Lab2-1.0-SNAPSHOT">
                <input type="submit" class="input-button" id="clean-button" value="Clean table">
                <input type="hidden" value="" name="clean-indicator" id="c-id">
            </form>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <table width="100%" id="result-table" class="result-table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Current time</th>
                    <th>Execution time</th>
                    <th>Hit detect</th>
                </tr>
                </thead>
                <tbody>
                <%
                    for (int i = 0; i < results.size(); i++) {
                        Result result = results.get(i);
                %>
                <tr>
                    <td><%=result.getX()%>
                    </td>
                    <td><%=result.getY()%>
                    </td>
                    <td><%=result.getR()%>
                    </td>
                    <td><%=result.getCurrTime()%>
                    </td>
                    <td><%=result.getExecutionTime()%>
                    </td>
                    <td><%=result.getHit()%>
                    </td>
                </tr>
                <%
                    }
                    ;
                %>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <table>
            <tr>
                <td>
                    <div class="cursor" name="cursed">
                        <div class="cursor line1" name="cursed"></div>
                        <div class="cursor line2" name="cursed"></div>
                    </div>
                </td>
            </tr>
        </table>
    </tr>
</table>
</body>
</html>