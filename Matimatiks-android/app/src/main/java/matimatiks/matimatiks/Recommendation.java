package matimatiks.matimatiks;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.helper.StaticLabelsFormatter;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ridwan on 10/22/2017.
 */

public class Recommendation extends AppCompatActivity {
    private  ArrayList<Boolean> Algebra = new ArrayList<>();
    private  ArrayList<Boolean> Integers = new ArrayList<>();
    private  ArrayList<Boolean> Mensuration = new ArrayList<>();
    private  ArrayList<Boolean> Geometry = new ArrayList<>();
    private  ArrayList<Boolean> Statistics = new ArrayList<>();
    private  ArrayList<Boolean> Sets_and_logic = new ArrayList<>();
    private final int NOF = 50;
    private int score = 0;
    private SpannableString sp;
    private Bitmap bitmap;
    private FirebaseAuth firebaseAuth;
    private String time;
    private byte[] dt;
    private ImageView img;



    private  int Int, alg, mens, geo, stats, s_l;
    private Map<Integer, Boolean> map;

    private int[] integers = {1, 2, 3, 4, 5, 6, 7, 32, 37, 41}, algebra = {8, 9, 10, 11, 12, 34, 38, 39, 40}, mensuration = {13, 14, 15, 36, 45}, geometry = {16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 33, 46, 48, 50}, statistics = {27, 28, 29, 35, 44, 47}, sets_and_logic = {31, 42, 49};

    private ArrayList<String> Attempted = new ArrayList<>();
    private int num_attempt;


    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recommend);

        Attempted = getIntent().getStringArrayListExtra("AT");
        num_attempt = getIntent().getIntExtra("num", -1);
        time = getIntent().getStringExtra("time");
        score = getIntent().getIntExtra("score",0);

         /* Adding the status bar for the activity**/
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }


        Toolbar toolbar = findViewById(R.id.toolBar_prog);

        toolbar.setTitle("RECOMMENDATION");
        toolbar.setTitleTextColor(Color.WHITE);



        setSupportActionBar(toolbar);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


        map = new HashMap<>();
        

        firebaseAuth = FirebaseAuth.getInstance();

        String arr_attempt ="";
        ArrayList<String[]> arr = null;



        if(getAttempt().size() > 0) {
            arr_attempt = getAttempt().get(getAttempt().size() - 1).replace("{", "").replace("}", "").replace(" ", "");
            String parts[] = arr_attempt.split(",");
            arr = new ArrayList<>();


            for (String part : parts) arr.add(part.split("="));


            for (int i = 0; i < arr.size(); i++) {
                if (arr.get(i)[1].equals("true"))
                    map.put(Integer.parseInt(arr.get(i)[0]), true);

                else
                    map.put(Integer.parseInt(arr.get(i)[0]), false);
            }
        }

        compute();

        recommend();

        TextView ex = findViewById(R.id.det);

        String exp = "ALG- Algebra, "+ "  "+ "GEO- Geometry, "+ "  " +"INT- Integers, "+ "  " +"MENS- Mensuration, "+ "  "+"S&L- Sets & Logic, "+"  "+"STATS- Statistics.";

        ex.setText(exp);

        TextView tp = findViewById(R.id.rec2);
        String txt = "SUGGESTIONS";
        tp.setText(txt);

        ArrayList<String>hp = new ArrayList<>();

       // str[0] ="Integers"+

       TextView t = findViewById(R.id.rec3);
       StringBuilder Help = new StringBuilder();

        if(help(Int,Integers.size()))
                hp.add("Integers");

        if(help(alg,Algebra.size()))
            hp.add("Algebra");

        if(help(geo,Geometry.size()))
            hp.add("Geometry");

        if(help(mens,Mensuration.size()))
            hp.add("Mensuration");

        if(help(s_l,Sets_and_logic.size()))
            hp.add("Sets&Logic");

        if(help(stats,Statistics.size()))
              hp.add("Statistics");

            for (int i = 0; i < hp.size()-1; i++)
                Help.append(hp.get(i)).append(", ");

            Help.append(hp.get(hp.size()-1));

        if(!(Help.toString().equals(""))) {
            String sum = "Based on your results, we recommend that you pay more attention" +
                    " to "+Help+" .Please visit and practice the questions under solve question exams to develop your" +
                    " skills in these area(s). Your report will be posted to your PROGRESS REPORT if you wish to monitor your " +
                    "progress. Your success is our utmost and paramount goal. Goodluck!";
             sp = new SpannableString(sum);
             sp.setSpan(new ForegroundColorSpan(Color.RED),sum.indexOf(Help.toString()),(sum.indexOf(Help.toString())+Help.length()), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
             sp.setSpan(new ForegroundColorSpan(Color.BLUE),(sum.indexOf("solve")),(sum.indexOf("solve")+20), Spanned.SPAN_INCLUSIVE_INCLUSIVE);


            sp.setSpan(new ClickableSpan() {
                @Override
                public void updateDrawState(TextPaint ds) {
                    super.updateDrawState(ds);
                    ds.setUnderlineText(true);
                }

                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(Recommendation.this,ProgressReport.class);
                    startActivity(intent);
                }
            }, (sum.indexOf("PROGRESS")),(sum.indexOf("PROGRESS")+15),Spanned.SPAN_INCLUSIVE_INCLUSIVE);
            t.setText(sp);
            t.setMovementMethod(LinkMovementMethod.getInstance());
            t.setHighlightColor(Color.TRANSPARENT);
        }


        else{
            if(stats+s_l+mens+geo+alg+Int < NOF ){
                String sum = ("Based on your results, we think and we're confident that you can still do better " +
                        ".Please visit and practice the questions under solve question exams to develop your" +
                        " score. Your report will be posted to your PROGRESS REPORT if you wish to monitor your " +
                        "progress.We believe practice makes perfection and your success is our utmost and paramount goal. Goodluck!");
                sp = new SpannableString(sum);
                sp.setSpan(new ForegroundColorSpan(Color.BLUE),(sum.indexOf("solve")),(sum.indexOf("solve")+20), Spanned.SPAN_INCLUSIVE_INCLUSIVE);


                sp.setSpan(new ClickableSpan() {
                    @Override
                    public void updateDrawState(TextPaint ds) {
                        super.updateDrawState(ds);
                        ds.setUnderlineText(true);
                    }

                    @Override
                    public void onClick(View view) {
                        Intent intent = new Intent(Recommendation.this,ProgressReport.class);
                        startActivity(intent);
                    }
                }, (sum.indexOf("PROGRESS")),(sum.indexOf("PROGRESS")+15),Spanned.SPAN_INCLUSIVE_INCLUSIVE);
                t.setText(sp);
               t.setMovementMethod(LinkMovementMethod.getInstance());
               t.setHighlightColor(Color.TRANSPARENT);
            }

            else{
                String sum = ("Based on your results, we think you did fantastically well. Well done! " +
                        "You can visit and practice the questions under solve question exams to maintain and develop your" +
                        "Skills and confidence. Your report will be posted to your PROGRESS REPORT if you wish to monitor your " +
                        "progress.We believe practice makes perfection and your success is our utmost and paramount goal. Goodluck!");
                sp = new SpannableString(sum);
                sp.setSpan(new ForegroundColorSpan(Color.BLUE),(sum.indexOf("solve")),(sum.indexOf("solve")+20), Spanned.SPAN_INCLUSIVE_INCLUSIVE);


                sp.setSpan(new ClickableSpan() {
                    @Override
                    public void updateDrawState(TextPaint ds) {
                        super.updateDrawState(ds);
                        ds.setUnderlineText(true);
                    }

                    @Override
                    public void onClick(View view) {
                        Intent intent = new Intent(Recommendation.this,ProgressReport.class);
                        startActivity(intent);
                    }
                }, (sum.indexOf("PROGRESS")),(sum.indexOf("PROGRESS")+15),Spanned.SPAN_INCLUSIVE_INCLUSIVE);
                t.setMovementMethod(LinkMovementMethod.getInstance());
                t.setHighlightColor(Color.TRANSPARENT);
                t.setText(sp);
            }
        }

    }

    /**
     * Render the points on the graph.
     */
    public  void recommend(){

        GraphView graph = findViewById(R.id.graph);

        String sub[] = new String[6];

        sub[0] = Int+" Int"; sub[1] = alg+" alg"; sub[2] = mens+" mens"; sub[3] = stats+" stats"; sub[4] = s_l+" s&l"; sub[5] = geo+" geo";
        Arrays.sort(sub);

        Map<String,Integer> m_score = new HashMap<>();

        m_score.put("Int",Integers.size());
        m_score.put("alg",Algebra.size());
        m_score.put("mens",Mensuration.size());
        m_score.put("stats",Statistics.size());
        m_score.put("geo",Geometry.size());
        m_score.put("s&l",Sets_and_logic.size());

        LineGraphSeries<DataPoint> series = new LineGraphSeries<>(new DataPoint[] {

                new DataPoint(1,m_score.get(sub[0].substring(sub[0].indexOf(" ")+1))),
                new DataPoint(2,m_score.get(sub[1].substring(sub[1].indexOf(" ")+1))),
                new DataPoint(3,m_score.get(sub[2].substring(sub[2].indexOf(" ")+1))),
                new DataPoint(4,m_score.get(sub[3].substring(sub[3].indexOf(" ")+1))),
                new DataPoint(5,m_score.get(sub[4].substring(sub[4].indexOf(" ")+1))),
                new DataPoint(6,m_score.get(sub[5].substring(sub[5].indexOf(" ")+1)))

        });

        LineGraphSeries<DataPoint> series2 = new LineGraphSeries<>(new DataPoint[] {
                new DataPoint(1,Integer.valueOf(sub[0].substring(0,sub[0].indexOf(" ")))),
                new DataPoint(2, Integer.valueOf(sub[1].substring(0,sub[1].indexOf(" ")))),
                new DataPoint(3,Integer.valueOf(sub[2].substring(0,sub[2].indexOf(" ")))),
                new DataPoint(4,Integer.valueOf(sub[3].substring(0,sub[3].indexOf(" ")))),
                new DataPoint(5,Integer.valueOf(sub[4].substring(0,sub[4].indexOf(" ")))),
                new DataPoint(6,Integer.valueOf(sub[5].substring(0,sub[5].indexOf(" "))))
        });

        graph.addSeries(series2);
        graph.addSeries(series);

        series.setColor(R.color.material_purple_a700);
        series.setAnimated(true);
        series.setTitle("Questions attempted");


        series2.setAnimated(true);
        series2.setTitle("Score");
        series2.setColor(Color.RED);


        StaticLabelsFormatter staticLabelsFormatter = new StaticLabelsFormatter(graph);
        staticLabelsFormatter.setHorizontalLabels(new String[] {sub[0].substring(sub[0].indexOf(" ")+ 1).toUpperCase()
                , sub[1].substring(sub[1].indexOf(" ")+ 1).toUpperCase(), sub[2].substring(sub[2].indexOf(" ")+ 1).toUpperCase(),
                sub[3].substring(sub[3].indexOf(" ")+ 1).toUpperCase(),
                sub[4].substring(sub[4].indexOf(" ")+ 1).toUpperCase(),
                sub[5].substring(sub[5].indexOf(" ")+ 1).toUpperCase()});

        graph.getGridLabelRenderer().setLabelFormatter(staticLabelsFormatter);
        graph.setTitle("Performance".toUpperCase());
        graph.setTitleTextSize(60);

        TextView g = findViewById(R.id.series2);
        TextView m = findViewById(R.id.series1);

        g.setTextColor(Color.RED);
        g.setBackgroundColor(Color.BLACK);
        m.setBackgroundColor(Color.BLACK);

    }

    public ArrayList<String> getAttempt(){
        return Attempted;
    }


    public int get_num_attempt(){
        return num_attempt;
    }

    private int set_list(ArrayList<Boolean>arr){
        int x = 0;
        for(int i =0; i<arr.size();i++){
            if(arr.get(i))
                x++;
        }

        return  x;
    }

    public void add_list(ArrayList<Boolean> arr, int [] array, Map<Integer,Boolean> map) {
        for (int anArray : array) {
            if (map.containsKey(anArray))
                arr.add(map.get(anArray));
        }
    }

    /**
     * This method converts device specific pixels to density independent pixels.
     *
     * @param px      A value in px (pixels) unit. Which we need to convert into db
     * @param context Context to get resources and device specific display metrics
     * @return A float value to represent dp equivalent to px value
     */
    public static float convertPixelsToDp(float px, Context context) {
        Resources resources = context.getResources();
        DisplayMetrics metrics = resources.getDisplayMetrics();
        return px / ((float) metrics.densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    /**
     * Compute the graph componenents for each subject.
     */
    public void compute (){

        /* Add all the attempted questions to their respective subjects*/
        add_list(Integers,integers,map);
        add_list(Algebra,algebra,map);
        add_list(Mensuration,mensuration,map);
        add_list(Statistics,statistics,map);
        add_list(Geometry,geometry,map);
        add_list(Sets_and_logic,sets_and_logic,map);

        /* Set the values of the correctly answered questions*/
        Int =    set_list(Integers);
        alg =   set_list(Algebra);
        mens =    set_list(Mensuration);
        geo = set_list(Geometry);
        stats =    set_list(Statistics);
        s_l =    set_list(Sets_and_logic);


    }

        public boolean help (double x, double y) {
            return y > 0 && x <= (y / 2);
        }
}

