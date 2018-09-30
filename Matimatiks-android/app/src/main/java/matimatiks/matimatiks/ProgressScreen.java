package matimatiks.matimatiks;

import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageButton;

/**
 * Created by ridwan on 3/16/2018.
 */

public class ProgressScreen extends AppCompatActivity{
    private Button b1,b2,b3,b4,b5,b6;
    private String type,score,time_t,doe,nqa;
    private Animation slide;
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.progress_screen);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        Intent intent = getIntent();

        time_t = intent.getStringExtra("Time");
        nqa = intent.getStringExtra("Attempt");
        doe = intent.getStringExtra("Date");
        score = intent.getStringExtra("Score");
        type = intent.getStringExtra("Exam");


        Toolbar tb = findViewById(R.id.toolBar_prog);

        tb.setTitle("REPORT DETAILS");
        tb.setTitleTextColor(getResources().getColor(R.color.company_color));

        setSupportActionBar(tb);

        this.getSupportActionBar().setDisplayShowHomeEnabled(true);
        this.getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        b1 = findViewById(R.id.Details1);
        b2 = findViewById(R.id.Details2);
        b3 = findViewById(R.id.Details3);
        b4 = findViewById(R.id.Details4);
        b5 = findViewById(R.id.Details5);
        b6 = findViewById(R.id.Details6);

        slide = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.slide_down);


        String a = "Exam: "+type;
        String b = "Score: "+score;
        String c = "Nos of questions: "+50;
        String d = "Nos of questions attempted: "+nqa;
        String e = "Time taken: "+time_t;
        String f = "Date: "+doe;


        b1.setText(a);
        b2.setText(b);
        b3.setText(c);
        b4.setText(d);
        b5.setText(e);
        b6.setText(f);


        b1.startAnimation(slide);
        b2.startAnimation(slide);
        b3.startAnimation(slide);
        b4.startAnimation(slide);
        b5.startAnimation(slide);
        b6.startAnimation(slide);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if(id == android.R.id.home)
            finish();

        return super.onOptionsItemSelected(item);
    }

}
